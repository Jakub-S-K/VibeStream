const User = require('../../schema.js').User;
const Image = require('../../schema.js').Image;
const sequelize = require('../../db_conn.js').conn;
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");
const { response } = require('express');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();;
jwtOptions.secretOrKey = process.env.JWT_SECRET;

module.exports.strategy = new JwtStrategy(jwtOptions, async function (jwt_payload, next) {
    const user = await User.findOne({
        where: {
            id: [jwt_payload.id],
        }
    })
    if (user) {
        next(null, { id: user.id });
    } else {
        next(null, false);
    }
});

passport.use(this.strategy);


module.exports.login = async function (req, res) {
    if (!req.body.nickname || !req.body.password) {
        console.log('Bad request');
        console.log(req.body);
        res.status(400).send({ message: "Username and password are required." });
        return;
    }
    const user = await User.findOne({
        where: {
            nickname: req.body.nickname
        }
    })

    if (user) {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            console.debug('same password');
            var payload = {
                id: user.id,
                exp: Math.floor(Date.now() / 1000) + (60 * 60)
            }
            var token = jwt.sign(payload, jwtOptions.secretOrKey);

            console.log('Ok');
            res.status(200).send({ user: { id: user.id, nickname: user.nickname }, token: token });
            return;
        }
    }

    console.log('Invalid username or password.');
    res.status(401).send({ message: "Invalid username or password." });
    return;
}

module.exports.register = async function (req, res) {
    const transaction = await sequelize.transaction();

    if (!req.body.nickname || !req.body.password || !req.body.email) {
        res.status(400).send({ message: "Invalid input. Please check your data and try again." });
        console.error('Invalid data');
        return;
    }

    const userExist = await User.findAll({
        where: {
            [Op.or]: [
                { email: req.body.email },
                { nickname: req.body.nickname }
            ],
        }
    })

    if (userExist.length !== 0) {
        res.status(409).send({ message: "User already exist" });
        console.error('User already exist');
        console.debug(userExist);
        return;
    }
    else {
        //if everything is okay
        console.debug('User doesnt exist');
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const pass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                nickname: req.body.nickname,
                email: req.body.email,
                password: pass,
            })

            if (!user) {
                res.status(500).send({ message: "Internal server error" });
                console.error('Cannot create user');
                return;
            }

            var payload = {
                id: user.id,
                exp: Math.floor(Date.now() / 1000) + (60 * 60)
            }
            var token = jwt.sign(payload, jwtOptions.secretOrKey);

            console.log('Created');
            res.status(201).send({ user: { id: user.id, nickname: user.nickname }, token: token });
        } catch (error) {
            await transaction.rollback();
            console.error(error);
            res.status(500).send({ message: 'Failed to register user' });
        } finally {
            await transaction.commit();
        }
    }
}

module.exports.register_optional = async function (req, res) {
    const transaction = await sequelize.transaction();
    var user = null;
    if (req.body.id) {
        user = await User.findOne({
            where: {
                id: req.body.id,
            }
        })
    }
    if (user == null) {
        res.status(400).send({ message: "Bad request" });
        console.error('Bad request');
        return;
    }
    try {
        if (req.body.bio) {
            user.bio = req.body.bio;
            await user.save();
        }
        if (req.files.length !== 0) {
            img = await Image.create({
                external_id: user.id,
                image: req.files[0].buffer,
            })
        }
        res.status(200).send({ message: "Ok" })
        console.log('Ok');
    }
    catch (error) {
        await transaction.rollback();
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
    finally {
        await transaction.commit();
    }
}