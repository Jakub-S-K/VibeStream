module.exports.get = function (req, res) {
    console.log("Welcome welcome from vibestream API");
    res.send("Vibestream API test")
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

module.exports.artists = function (req, res) {
    console.log("Artists");
    res.json(artistsJSON);
}

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

module.exports.albums = function (req, res) {
    console.log("Albums");
    res.json(albums);
}