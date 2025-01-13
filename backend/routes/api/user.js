const User = require('../../schema.js').User;
const Image = require('../../schema.js').Image;
const sequelize = require('../../db_conn.js').conn;

module.exports.trending = async function (req, res) {
	_n = req.params.n;
	const user = await User.findAll({
		order: sequelize.random(),
		limit: parseInt(_n),
	})
	if (!user || Object.keys(user).length === 0) {
		console.log('User not found');
		res.status(404).send({message: "User not found."});
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
		console.log('User not found.');
		res.status(404).send({message: "User not found."});
		return;
	}
	// else{
	// 	console.log('Internal server error.');
	// 	res.status(500).send({message: "Internal server error."});
	// 	return;
	// }
	console.log('nickname:', _name);
	console.log(user);
	res.json(user);
}

