const User = require('../../schema.js').User;
const Image = require('../../schema.js').Image;
const sequelize = require('../../db_conn.js').conn;
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();;
jwtOptions.secretOrKey = process.env.JWT_SECRET;

module.exports.strategy = new JwtStrategy(jwtOptions, async function (jwt_payload, next) {

    //User.findOne().where('id').in(jwt_payload.id).then(user => {
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
    const transaction = await sequelize.transaction();

    if (!req.body.nickname || !req.body.password) {
        console.log('Bad request');
        console.log(req.body);
        res.status(400).send({message: "Username and password are required."});
        return;
    }
    const user = await User.findOne({
        where: {
            nickname: req.body.nickname
        }
    })
    if (user) {
        if (bcrypt.compare(req.body.password, user.password)) {
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

    // done in front? fuck it comments don't do shit they can stay
    // if (Object.keys(req.body).length === 0) {
    // 	res.status(400).send("Wrong reqs");
    // 	console.error('Wrong reqs');
    // 	console.error(req.body);
    // 	return;
    // }
    const userExist = await User.findAll({
        where: {
            [Op.or]: [
                { email: req.body.email },
                { nickname: req.body.nickname }
            ],
        }
    })
    if (userExist.length !== 0) {
        res.status(409).send({message: "User already exist"});
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
                bio: req.body.bio,
            })

            if (!user) {
                res.status(501).send({message: "Internal server error"});
                console.error('Cannot create user');
                return;
            }

            if (req.files.length !== 0) {
                img = await Image.create({
                    external_id: user.id,
                    image: req.files[0].buffer,
                })
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
            res.status(500).send({ message: 'Failed to create album' });
        } finally {
            await transaction.commit();
        }
    }

}