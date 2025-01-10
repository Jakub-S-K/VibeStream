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

module.exports.user_username = async function (req, res) {
	_name = req.params.username;
	const user = await User.findOne({
		where: {
			nickname: _name,
		}
	})
	if (!user) {
		console.log('User not found');
		res.status(404).send("User not found.");
		return;
	}
	console.log('nickname:', _name);
	console.log(user);
	res.json(user);
}