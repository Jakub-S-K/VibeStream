const { Tag, Genre, Image } = require('../../schema.js')

module.exports.tags = async function (req, res) {
    const tags = await Tag.findAll({
        attributes: ['name']
    })
    if (!tags || Object.keys(tags).length === 0) {
        res.status(500).send("Internal Server Error");
        return;
    }
    console.log(tags);
    res.json(tags);
}

module.exports.genres = async function (req, res) {
    const genres = await Genre.findAll({
        attributes: ['name']
    })
    if (!genres || Object.keys(genres).length === 0) {
        res.status(500).send("Internal Server Error");
        return;
    }
    console.log(genres);
    res.json(genres);
}

module.exports.get_image = async function(req, res) {
    if (!req.params.id) {
        res.status(400).send({ error: 'Bad request: missing id' });
        return;
    }
    const image = await Image.findOne({ where: { id: req.params.id }});
    if (!image) {
        res.status(404).send({ error: 'Not found' });
        return;
    }
    res.status(200).send(image.image);
}