const User = require('../../schema.js').User;
const Comment = require('../../schema.js').Comment;
  
module.exports.get = function (req, res) {
    console.log("Welcome welcome from vibestream API");
    res.send("Vibestream API test")
}


module.exports.artists = function (req, res) {
    console.log("Trending artists");
    res.json(artistsJSON);
}


module.exports.albums = function (req, res) {
    console.log("Trending Albums");
    res.json(albumsJSON);
}

module.exports.test_db = async function (req, res) {
    const user = await User.findAll();
    console.log(user);
    res.json(user);
}

module.exports.get_comments = async function (req, res) {
    _id = req.params.id //expressJS parsuje automatycznie wszystkie zmienne w adresie czyli /:id/ jest pod req.params.id
    const user = await User.findOne({ //Dla wielu rekordów jest jeszcze findAll. await czeka na zakonczenie requesta z bazy.
        where: {
            id: _id //where jak w sql tutaj id uzytkownika z bazy jest porownywane
        },
        include: Comment //LEFT JOIN jak w sql, do inner join trzeba zrobić -> include: [{ model: Comment, required: true }]
    });
    if (!user) {
        console.log('Not found');
        res.status(404).send("Not found.");
        return;
    }
    console.log(user);
    res.json(user); //znaleziony rekord jest przerabiany na jsona i zwracany.
}

const artistsJSON = [
    {
        "image": "avatar1",
        "username": "PodwojnaLipa"
    },
    {
        "image": "avatar2",
        "username": "DJKaprysnaDrukarkaHP"
    },
    {
        "image": "avatar3",
        "username": "patrycjaaaaaa"
    },
    {
        "image": "avatar4",
        "username": "kierowcaSolarisa"
    },
    {
        "image": "avatar5",
        "username": "DJPaprykarzSzczecinski"
    },
    {
        "image": "avatar6",
        "username": "LeoLoud"
    },
    {
        "image": "avatar7",
        "username": "JakeJam"
    }
]

const albumsJSON = [
    {
        "albumName": "Album",
        "albumImage": "album1",
        "username": "Artist 1"
    },
    {
        "albumName": "Album",
        "albumImage": "album2",
        "username": "Artist 2"
    },
    {
        "albumName": "Album",
        "albumImage": "album3",
        "username": "Artist 3"
    },
    {
        "albumName": "Albummmmmmmmm",
        "albumImage": "album4",
        "username": "meeGAS"
    },
    {
        "albumName": "Album aa bbcc ccc",
        "albumImage": "album5",
        "username": "Artist 5"
    },
    {
        "albumName": "Album",
        "albumImage": "album6",
        "username": "Artist 6"
    },
    {
        "albumName": "Album",
        "albumImage": "album7",
        "username": "Artist 7"
    }
]