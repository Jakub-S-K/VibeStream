const User = require('../../schema.js').User;
const sequelize = require('../../db_conn.js').conn;

module.exports.trending = async function (req, res) {
    _n = req.params.n;
    const user = await User.findAll({
        order: sequelize.random(),
        limit: parseInt(_n),
    })
    if (!user) {
        console.log('Not found');
        res.status(404).send("Not found.");
        return;
    }
    console.log('n:', _n);
    console.log(user);
    res.json(user);
}

module.exports.user_brief = async function (req, res) {
    _id = req.params.id;
    const brief = await User.findOne({
        attributes: ['nickname'],
        where: {
            id: _id,
        }
    })
    if (!brief) {
        console.log('Not found');
        res.status(404).send("Not found.");
        return;
    }
    console.log('id:', _id);
    console.log(brief);
    res.json(brief);
}