const User = require('../../schema.js').User;
const Image = require('../../schema.js').Image;
const sequelize = require('../../db_conn.js').conn;
const { Op } = require('sequelize');
const bcryptjs = require('bcryptjs');

module.exports.trending = async function (req, res) {
	_n = req.params.n;
	const user = await User.findAll({
		order: sequelize.random(),
		limit: parseInt(_n),
	})
	if (!user || Object.keys(user).length === 0) {
		console.log('User not found');
		res.status(404).send("User not found.");
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
	if (Object.keys(user).length === 0) {
		console.log('User not found.');
		res.status(404).send("User not found.");
		return;
	}
	else if (!user) {
		console.log('Internal server error.');
		res.status(500).send("Internal server error.");
		return;
	}
	console.log('nickname:', _name);
	console.log(user);
	res.json(user);
}

module.exports.register = async function (req, res) {
	const transaction = await sequelize.transaction();

	//for now:
	if (Object.keys(req.body).length === 0) {
		res.status(400).send("Wrong reqs");
		console.error('Wrong reqs');
		console.error(req.body);
	}

	const userExist = await User.findOne({
		where: {
			[Op.or]:
				[{
					nickname: req.body.nickname,
					email: req.body.email,
				}]
		}
	})
	if (userExist) {
		res.status(409).send("User already exist");
		console.error('User already exist');
	}
	else {
		console.debug('User doesnt exist');
		try {
			const salt = await bcryptjs.genSalt(10);
			const pass = await bcryptjs.hash(req.body.password, salt);

			user = await User.create({
				nickname: req.body.nickname,
				email: req.body.email,
				password: pass,
				bio: req.body.bio,
			})

			if (!user) {
				res.status(501).send(("Internal server error"));
				console.error('Cannot create user');
			}

			if (req.files.length !== 0) {
				img = await Image.create({
					external_id: user.id,
					image: req.files[0],
				})
			}

			//add .send(user, token)
			res.status(201).send(user.id);
		} catch (error) {
			await transaction.rollback();
			console.error(error);
			res.status(500).send({ error: 'Failed to create album' });
		} finally {
			await transaction.commit();
		}

	}

}