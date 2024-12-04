const User = require('../../schema.js').User;
  
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