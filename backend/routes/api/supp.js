const Tag = require('../../schema.js').Tag;
const Genre = require('../../schema.js').Genre;

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