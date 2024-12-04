module.exports.get = function (req, res) {
    console.log("Welcome welcome from vibestream API");
    res.send("Vibestream API test")
}

const trendingJSON = [
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