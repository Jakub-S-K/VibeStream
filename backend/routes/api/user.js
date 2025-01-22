const { Album, User, Image, Album_like } = require('../../schema.js');
const sequelize = require('../../db_conn.js').conn;
const { Op } = require('sequelize');

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
	//console.log('n:', _n);
	//console.log(user);
	res.json(user);
}

module.exports.get_user_username = async function(req, res) {
	if(!req.params.nickname){
		console.log('Bad request');
        return res.status(400).send({ message: "Name is required" });
	}
	_name = req.params.nickname;

	try {
        const userLikes = await User.findOne({
            where: {
                nickname: _name,
            },
            attributes: [
                'id', 'nickname', 'creation_date', 'bio',
                [sequelize.fn('COUNT', sequelize.col('albums.album_likes.id')), 'like_count'],
            ],
            include: [
                {
                    model: Album,
                    attributes: [],
                    include: [
                        {
                            model: Album_like,
                            attributes: [],
                        }
                    ]
                },
            ],
            group: ['user.id'],
            order: [[sequelize.literal('like_count'), 'DESC']],
        });
		if(!userLikes){
			console.log('No user found');
			return res.status(400).send({message: "No user found"});
		}
		else{
			console.log(parseInt(userLikes.dataValues.like_count));
			//return res.status(200).json({like_count: parseInt(userLikes.dataValues.like_count)});
            return res.status(200).json(userLikes);
		}
        
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.get_search = async function (req, res) {
    _s = req.params.search_string;
    console.debug(_s);

    try {
        const usersWithLikes = await User.findAll({
            where: {
                nickname: { [Op.like]: '%' + _s + '%' }
            },
            attributes: [
                'id',
                'nickname',
                [sequelize.fn('COUNT', sequelize.col('albums.album_likes.id')), 'like_count'],
            ],
            include: [
                {
                    model: Album,
                    attributes: [],
                    include: [
                        {
                            model: Album_like,
                            attributes: [],
                        }
                    ]
                },
                {
                    model: Image,
                    attributes: [['id', 'avatar_id']],
                }
            ],
            group: ['user.id', 'image.id'],
            order: [[sequelize.literal('like_count'), 'DESC']],
        });

        res.json(usersWithLikes);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }

}
