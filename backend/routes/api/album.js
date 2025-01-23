const { Album, Image, Song, Genre, Album_like, User, Album_tags, Tag } = require('../../schema.js');
const sequelize = require('../../db_conn.js').conn;
const { Op } = require('sequelize');
const { loadMusicMetadata } = require('music-metadata');

module.exports.trending = async function (req, res) {
    _n = req.params.n;
    const album = await Album.findAll({
        order: sequelize.random(),
        limit: parseInt(_n),
        include: {
            model: User,
            attributes: ['nickname'],
        },
    })
    if (Object.keys(album).length === 0) {
        console.log('Album not found');
        res.status(404).send({ message: "Album not found." });
        return;
    }
    else if (!album) {
        console.log('Internal server error.');
        res.status(500).send({ message: "Internal server error." });
        return;
    }
    res.json(album);
}

module.exports.albumpage_info = async function (req, res) {
    _id = req.params.id;
    const album = await Album.findOne({
        where: {
            id: _id,
        },
        include: [
            {
                model: Album_tags,
                include: [
                    {
                        model: Tag,
                        attributes: ['name'],
                    }
                ],
            },
        ],
    })
    if (!album) {
        console.log('Album not found');
        res.status(404).send({ message: "Album not found." });
        return;
    }
    else {
        const tags = album.album_tags.map(
            (tagEntry) => tagEntry.tag.name);
        album.dataValues.tags = tags;

        const songs = await Song.findAll({
            raw: true,
            order: sequelize.literal('title ASC'),
            attributes: ['title', 'id', 'length', 'play_counter'],
            where: {
                album_id: album.dataValues.id,
            }
        })
        album.dataValues.songs = songs;

        const author = await User.findOne({
            raw: true,
            where: {
                id: album.dataValues.user_id,
            }
        })
        album.dataValues.author = author.nickname;

        const image = await Image.findOne({
            raw: true,
            where: {
                external_id: album.dataValues.id,
            }
        })
        album.dataValues.image = image?.id || null;

        const genre_name = await Genre.findOne({
            where: {
                id: album.genre_id,
            },
            attributes: ['name'],
        })
        album.dataValues.genre = genre_name.name;

        const albumLikes = await Album.findOne({
            where: {
                id: album.dataValues.id,
            },
            attributes: [
                'id', 'name', 'user_id', 'description', 'genre_id',
                [sequelize.fn('COUNT', sequelize.col('album_likes.id')), 'like_count'],
            ],
            include: [
                {
                    model: Album_like,
                    attributes: [],
                }
            ],
            group: ['album.id'],
            order: [[sequelize.literal('like_count'), 'DESC']],
        });
        album.dataValues.like_count = albumLikes.dataValues.like_count;

        const myLike = await Album_like.findOne({
            where: {
                user_id: album.dataValues.user_id,
            }});
        album.dataValues.liked_by_user = myLike ? 1 : 0;
        
        delete album.dataValues.genre_id;
        delete album.dataValues.album_tags;
        delete album.album_tags;
    }
    console.log(album);
    res.json(album);
}

module.exports.create = async function (req, res) {
    if (!req.body.title || !req.body.id || !req.body.genre) {
        res.status(400).send({ message: 'Bad request, fill out all the fields' });
        return;
    }
    const genre = await Genre.findOne({ where: { id: req.body.genre } });
    if (!genre) {
        res.status(501).send({ message: 'Internal server error.' });
        return;
    }

    const mm = await loadMusicMetadata();
    const transaction = await sequelize.transaction();
    try {
        album = await Album.create({
            name: req.body.title,
            user_id: req.body.id,
            description: req.body?.description || "",
            genre_id: genre.dataValues.id
        });
        if (!album) {
            res.status(501).send({ message: "Internal Server Error" });
            console.error('Cannot create album');
            return;
        }

        const tags = req.body.tags ? JSON.parse(req.body.tags) : [];

        if (tags.length > 0) {
            const tagIds = tags.map((tag) => tag.id);

            const albumTagsData = tagIds.map((tagId) => ({
                album_id: album.id,
                tag_id: tagId,
            }));

            await Album_tags.bulkCreate(albumTagsData);
        }

        for (const [index, element] of req.files.entries()) {
            if (element.fieldname === 'cover') {
                img = await Image.create({
                    external_id: album.dataValues.id,
                    image: element.buffer
                });
                continue;
            }
            const metadata = await mm.parseBuffer(element.buffer);
            song = await Song.create({
                title: Array.isArray(req.body.filesNames) ? req.body.filesNames[index].trim() : req.body.filesNames.trim(),
                album_id: album.id,
                length: metadata.format?.duration || 0,
                file: element.buffer
            })
        }
        await transaction.commit();
        res.status(201).send({ message: 'Album created successfully', albumId: album.id });
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        res.status(500).send({ message: 'Failed to create album' });
    }
}

module.exports.get_stream_song = async function (req, res) {
    if (!req.params.id) {
        res.status(400).send({ message: 'Bad request: missing id' });
        return;
    }
    const song = await Song.findOne({
        where: { id: req.params.id }
    });
    if (!song) {
        res.status(404).send({ message: 'Song not found' });
        return;
    }
    const result = await song.increment('play_counter', { by: 1 });
    res.status(200).send(song.file);
    return;
}

module.exports.get_album_id = async function (req, res) {
    if (!req.params.id) {
        console.log('Bad request');
        res.status(400).send({ message: "Id is required" });
        return;
    }
    _id = req.params.id;

    try {
        const albumLikes = await Album.findOne({
            where: {
                id: _id,
            },
            attributes: [
                'id', 'name', 'user_id', 'description', 'genre_id',
                [sequelize.fn('COUNT', sequelize.col('album_likes.id')), 'like_count'],
            ],
            include: [
                {
                    model: Album_like,
                    attributes: [],
                }
            ],
            group: ['album.id'],
            order: [[sequelize.literal('like_count'), 'DESC']],
        });
        if (!albumLikes) {
            console.log('No album found');
            return res.status(400).send({ message: "No album found" });
        }
        else {
            console.log(parseInt(albumLikes.dataValues.like_count));
            return res.status(200).json(albumLikes);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.get_search_album = async function (req, res) {
    _s = req.params.search_string;
    console.debug(_s);

    try {
        const albumsWithLikes = await Album.findAll({
            where: {
                name: { [Op.like]: '%' + _s + '%' }
            },
            attributes: [
                'id',
                'name',
                [sequelize.fn('COUNT', sequelize.col('album_likes.id')), 'like_count'],
            ],
            include: [
                {
                    model: Album_like,
                    attributes: [],
                },
                {
                    model: Image,
                    attributes: [['id', 'avatar_id']],
                }
            ],
            group: ['album.id', 'image.id'],
            order: [[sequelize.literal('like_count'), 'DESC']],
        });

        res.json(albumsWithLikes);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }

}

// module.exports.get_search_song = async function (req, res) {
//     _s = req.params.search_string;
//     console.debug(_s);

//     const songs = await Song.findAll({
//         where: {
//             title: { [Op.like]: '%' + _s + '%' }
//         },
//         attributes: {
//             exclude: ['file']
//         },
//         // include: [
//         //     {
//         //         model: Album,
//         //         attributes: ['id'],
//         //         include: [
//         //             {
//         //                 model: Image,
//         //                 attributes: [['id', 'avatar_id']],
//         //             }
//         //         ]
//         //     }
//         // ],
//         // group: ['album.id', 'image.id'],
//         order: [['play_counter', 'DESC']],
//     })

//     if (!songs) {
//         console.log("Failed to search songs");
//         return res.status(500).send({ message: 'Internal server error' });
//     }

//     res.json(songs);

// }

module.exports.get_search_song = async function (req, res) {
    const _s = req.params.search_string;
    console.debug(_s);

    try {
        const songs = await Song.findAll({
            where: {
                title: { [Op.like]: '%' + _s + '%' }
            },
            attributes: {
                exclude: ['file']
            },
            include: [
                {
                    model: Album,
                    attributes: [],
                    include: [
                        {
                            model: Image,
                            attributes: ['id'],
                            required: false,
                        }
                    ]
                }
            ],
            order: [['play_counter', 'DESC']],
        });

        if (!songs) {
            console.log("Failed to search songs");
            return res.status(500).send({ message: 'Internal server error' });
        }

        const result = songs.map(song => ({
            ...song.get(),
            album_avatar_id: song.Album?.Image?.id || null
        }));

        res.json(result);

    } catch (error) {
        console.error("Error in get_search_song:", error);
        res.status(500).send({ message: 'Internal server error' });
    }
}