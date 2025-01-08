const Tag = require('../../schema.js').Tag;
const Genre = require('../../schema.js').Genre;
const sequelize = require('../../db_conn.js').conn;

module.exports.tags = async function (req, res) {
    const tags = await Tag.findAll({
        attributes: ['tag_name']
    })
    if (!tags) {
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
    if (!genres) {
        res.status(500).send("Internal Server Error");
        return;
    }
    console.log(genres);
    res.json(genres);
}