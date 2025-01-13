const { Album, Image, Song, Genre} = require('../../schema.js');
const sequelize = require('../../db_conn.js').conn;
const { loadMusicMetadata } = require('music-metadata');

module.exports.trending = async function (req, res) {
    _n = req.params.n;
    const album = await Album.findAll({
        order: sequelize.random(),
        limit: parseInt(_n),
    })
    if (Object.keys(album).length === 0) {
        console.log('Album not found');
        res.status(404).send("Album not found.");
        return;
    }
    else if (!album){
        console.log('Internal server error.');
        res.status(500).send("Internal server error.");
        return;
    }
    console.log('n:', _n);
    console.log(album);
    res.json(album);
}

module.exports.album_name = async function (req, res) {
    _name = req.params.name;
    const album = await Album.findOne({
        where: {
            name: _name,
        }
    })
    if (Object.keys(album).length === 0) {
        console.log('Album not found');
        res.status(404).send("Album not found.");
        return;
    }
    else if (!album){
        console.log('Internal server error.');
        res.status(500).send("Internal server error.");
        return;
    }
    console.log(album);
    res.json(album);
}

module.exports.create = async function (req, res) {
    const transaction = await sequelize.transaction();

    if (!req.body.title || !req.body.id || !req.body.genre || !req.body.description) {
        res.status(400).send({ error: 'Bad request: missing id' });
        return;
    }
    const genre = await Genre.findOne({ where: { name: req.body.genre}});
    if (!genre) {
        res.status(501).send({ error: 'Internal server error.' });
    }
    const mm = await loadMusicMetadata();
    try {
        album = await Album.create({
            name: req.body.title,
            user_id: req.body.id,
            description: req.body.description,
            genre_id: genre.id
        });
        if (!album) {
            res.status(501).send("Internal Server Error");
            console.error('Cannot create album');
        }
        for (const element of req.files) {
            if (element.fieldname === 'cover') {
                img = await Image.create({
                    external_id: req.body.id,
                    image: element.buffer
                });
                continue;
            }
            const metadata = await mm.parseBuffer(element.buffer);
            song = await Song.create({
                title: element.originalname,
                album_id: album.id,
                length: metadata.format.duration,
                file: element.buffer
            })
        }
        res.status(201).send({ message: 'Album created successfully', albumId: album.id});
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        res.status(500).send({ error: 'Failed to create album' });
    } finally {
        await transaction.commit();
    }

}

module.exports.get_stream_song = async function (req, res) {
    if (!req.params.id) {
        res.status(400).send({ error: 'Bad request: missing id' });
        return;
    }
    const song = await Song.findOne({
        where: { id: req.params.id }
    });
    if (!song) {
        res.status(404).send({ error: 'Song not found' });
        return;
    }
    const result = await song.increment('play_counter', { by: 1 });
    res.status(200).send(song.file);
    return;
}