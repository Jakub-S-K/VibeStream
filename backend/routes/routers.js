const express = require('express')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const userApi = require('./api/user.js');
const albumApi = require('./api/album.js');
const testApi = require('./test/test.js');
const suppApi = require('./api/supp.js');
const authApi = require('./api/auth.js');
const passport = require('passport');

module.exports = function (app) {
    const test = express.Router();
    const api = express.Router();

    api.use(passport.initialize());

    //user
    api.get('/trending/users/:n', userApi.trending);
    api.get('/user/:nickname', userApi.get_user_username);
    api.get('/search/user/:search_string', userApi.get_search);
    api.get('/useralbums/:id', userApi.get_user_albums);

    api.get('/userlikes/:id', userApi.get_user_likes);
    api.post('/addlike', userApi.add_album_like);
    api.post('/removelike', userApi.remove_album_like);

    //TODO add token handling
    api.post('/login', authApi.login);
    api.post('/register', authApi.register);
    api.post('/register/optional', upload.any(), authApi.register_optional);

    //album
    api.get('/trending/albums/:n', albumApi.trending);
    // api.get('/album/:id', albumApi.get_album_id); //Temporary comment as Endpoint are duplicated. TODO: use only one endpoint
    api.get('/search/album/:search_string', albumApi.get_search_album);
    api.get('/search/song/:search_string', albumApi.get_search_song);
    api.get('/albumpage/:id', albumApi.albumpage_info);

    //api.post('/album', passport.('jwt', {session: false}), upload.any(), albumApi.create);
    api.post('/album', upload.any(), albumApi.create);
    api.get('/stream/:id', albumApi.get_stream_song);

    //other
    api.get('/tags', suppApi.tags);
    api.get('/genres', suppApi.genres);
    api.get('/image/:id', suppApi.get_image);



    test.get('/hello', testApi.get); //Local path in this case /test/hello
    test.get('/albums', testApi.albums);
    test.get('/artists', testApi.artists);
    test.get('/user', testApi.test_db);
    test.get('/user/:id/comments', testApi.get_comments);
    test.post('/upload', upload.any(), testApi.upload);

    app.use('/api', api);
    app.use('/test', test); //Add all 'test' local paths to global /test/<PATH> routes
}
