const Tag = require('../../schema.js').Tag;
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