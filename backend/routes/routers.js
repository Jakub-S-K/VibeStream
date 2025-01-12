const express = require('express')
const multer  = require('multer')
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

    //user
    api.get('/trending/users/:n', userApi.trending);
    api.get('/user/:username', userApi.user_username);

    //TODO add token handling
    api.post('/login', upload.any(), authApi.login);
    api.post('/register', upload.any(), authApi.register);

    //album
    api.get('/trending/albums/:n', albumApi.trending);
    api.get('/album/:name', albumApi.album_name);

    api.post('/album', passport.authenticate('jwt', {session: false}), upload.any(), albumApi.create);

    //other
    api.get('/tags', suppApi.tags);
    api.get('/genres', suppApi.genres);


    test.get('/hello', passport.authenticate('jwt', {session: false}), testApi.get); //Local path in this case /test/hello
    test.get('/albums', testApi.albums);
    test.get('/artists', testApi.artists);
    test.get('/user', testApi.test_db);
    test.get('/user/:id/comments', testApi.get_comments);
    test.post('/upload', upload.any(), testApi.upload);

    app.use('/api', api);
    app.use('/test', test); //Add all 'test' local paths to global /test/<PATH> routes
}
