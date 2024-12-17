const Album = require('../../schema.js').Album;
const sequelize = require('../../db_conn.js').conn;

module.exports.trending = async function (req, res) {
    _n = req.params.n;
    const album = await Album.findAll({
        order: sequelize.random(),
        limit: 2 //parseInt(_n),
        //subquery: false
    })
    if (!album) {
        console.log('Not found');
        res.status(404).send("Not found.");
        return;
    }
    console.log('n:', _n);
    console.log(album);
    res.json(album);
}