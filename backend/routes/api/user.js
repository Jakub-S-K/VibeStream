const { Album, User, Image, Album_like } = require('../../schema.js');
const sequelize = require('../../db_conn.js').conn;
const { Op } = require('sequelize');

module.exports.trending = async function (req, res) {
    _n = req.params.n;
    const user = await User.findAll({
        attributes: {
            exclude: ['password', 'email'],
        },
        order: sequelize.random(),
        limit: parseInt(_n),
    })
    if (!user || Object.keys(user).length === 0) {
        console.log('User not found');
        res.status(404).send({ message: "User not found." });
        return;
    }
    res.json(user);
}

module.exports.get_user_username = async function (req, res) {
    if (!req.params.nickname) {
        console.log('Bad request');
        return res.status(400).send({ message: "Name is required" });
    }
    _name = req.params.nickname;

    try {
        const userLikes = await User.findOne({
            where: {
                nickname: _name,
            },
            attributes: [
                'id', 'nickname', 'email', 'creation_date', 'bio',
                [sequelize.fn('COUNT', sequelize.col('albums.album_likes.id')), 'like_count'],
            ],
            include: [
                {
                    model: Album,
                    attributes: [],
                    include: [
                        {
                            model: Album_like,
                            attributes: [],
                        }
                    ]
                },
            ],
            group: ['user.id'],
            order: [[sequelize.literal('like_count'), 'DESC']],
        });
        if (!userLikes) {
            console.log('No user found');
            return res.status(400).send({ message: "No user found" });
        }
        else {
            console.log(parseInt(userLikes.dataValues.like_count));
            return res.status(200).json(userLikes);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.get_search = async function (req, res) {
    _s = req.params.search_string;
    console.debug(_s);

    try {
        const usersWithLikes = await User.findAll({
            where: {
                nickname: { [Op.like]: '%' + _s + '%' }
            },
            attributes: [
                'id',
                'nickname',
                [sequelize.fn('COUNT', sequelize.col('albums.album_likes.id')), 'like_count'],
            ],
            include: [
                {
                    model: Album,
                    attributes: [],
                    include: [
                        {
                            model: Album_like,
                            attributes: [],
                        }
                    ]
                },
                {
                    model: Image,
                    attributes: [['id', 'avatar_id']],
                }
            ],
            group: ['user.id', 'image.id'],
            order: [[sequelize.literal('like_count'), 'DESC']],
        });

        res.json(usersWithLikes);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

module.exports.add_album_like = async function (req, res) {
    if (!req.body.album_id || !req.body.user_id) {
        console.log('Wrong params');
        return res.status(500).send({ message: 'Internal server error' });
    }
    const like_exist = await Album_like.findOne({
        where: {
            user_id: req.body.user_id,
            album_id: req.body.album_id
        }
    })
    if (like_exist) {
        console.log('Like already exists');
        return res.status(400).send({ message: 'You already like this album' });
    }

    const transaction = await sequelize.transaction();
    try {
        like = await Album_like.create({
            user_id: req.body.user_id,
            album_id: req.body.album_id,
        })
        if (!like) {
            return res.status(501).send({ message: 'Internal Server Error' });
        }
        await transaction.commit();
        res.status(201).send({ message: 'Album liked successfully' });
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        res.status(500).send({ message: 'Failed to add album like' });
    }
}

module.exports.remove_album_like = async function (req, res) {
    if (!req.body.album_id || !req.body.user_id) {
        console.log('Wrong params');
        return res.status(500).send({ message: 'Internal server error' });
    }
    const like_exist = await Album_like.findOne({
        where: {
            user_id: req.body.user_id,
            album_id: req.body.album_id
        }
    })
    if (!like_exist) {
        console.log('Like doesnt exists');
        return res.status(400).send({ message: 'You can\'t unlike this album' });
    }

    like_exist.destroy();
    res.status(201).send({ message: 'Album unliked successfully' });
}

module.exports.get_user_albums = async function (req, res) {
    if (!req.params.id) {
        console.log('No id in params');
        return res.status(500).send({ message: 'Internal server error' });
    }
    _id = req.params.id;
    try {
        const albumsWithLikes = await Album.findAll({
            where: {
                user_id: _id
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
            ],
            group: ['album.id'],
            order: [[sequelize.literal('like_count'), 'DESC']],
        });

        res.json(albumsWithLikes);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}