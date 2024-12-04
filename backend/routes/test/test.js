module.exports.get = function (req, res) {
    console.log("Welcome welcome from vibestream API");
    res.send("Vibestream API test")
}

const trendingJSON = [
    {
        "image": "avatar",
        "username": "Artist 1"
    },
    {
        "image": "avatar",
        "username": "Artist 2"
    },
    {
        "image": "avatar",
        "username": "Artist 3"
    },
    {
        "image": "avatar",
        "username": "meeGAS"
    },
    {
        "image": "avatar",
        "username": "Artist 5"
    },
    {
        "image": "avatar",
        "username": "Artist 6"
    },
    {
        "image": "avatar",
        "username": "Artist 7"
    }
]

module.exports.trending = function (req, res) {
    console.log("Trending");
    res.json(trendingJSON);
}

const artistsJSON = [
    {
        "albumName": "Album",
        "albumImage": "",
        "username": "Artist 1"
    },
    {
        "albumName": "Album",
        "albumImage": "",
        "username": "Artist 2"
    },
    {
        "albumName": "Album",
        "albumImage": "",
        "username": "Artist 3"
    },
    {
        "albumName": "Albummmmmmmmm",
        "albumImage": "",
        "username": "meeGAS"
    },
    {
        "albumName": "Album aa bbcc ccc",
        "albumImage": "",
        "username": "Artist 5"
    },
    {
        "albumName": "Album",
        "albumImage": "",
        "username": "Artist 6"
    },
    {
        "albumName": "Album",
        "albumImage": "",
        "username": "Artist 7"
    }
]

module.exports.artists = function (req, res) {
    console.log("Artists");
    res.json(artistsJSON);
}