const { Tag, Genre, Image } = require('../../schema.js')

module.exports.tags = async function (req, res) {
    const tags = await Tag.findAll({
        attributes: ['id', 'name'],
        order: [['name', 'ASC']],
    })
    if (!tags || Object.keys(tags).length === 0) {
        res.status(500).send({ message: "Internal Server Error" });
        return;
    }
    res.json(tags);
}

module.exports.genres = async function (req, res) {
    const genres = await Genre.findAll({
        attributes: ['id', 'name'],
        order: [['name', 'ASC']],
    })
    if (!genres || Object.keys(genres).length === 0) {
        res.status(500).send({ message: "Internal Server Error" });
        return;
    }
    res.json(genres);
}

module.exports.get_image = async function (req, res) {
    if (!req.params.id) {
        res.status(400).send({ message: 'Bad request: missing id' });
        return;
    }

    const image = await Image.findOne({ where: { external_id: req.params.id } });

    if (!image) {
        res.status(404).send({ message: 'Not found' });
        return;
    }
    res.status(200).send(image.image);
}
