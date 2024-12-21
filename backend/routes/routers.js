const express = require('express')

const userApi = require('./api/user.js');
const albumApi = require('./api/album.js');
const testApi = require('./test/test.js');
const suppApi = require('./api/supp.js');

module.exports = function (app) {
    const test = express.Router();
    const api = express.Router();

    api.get('/trending/users/:n', userApi.trending);
    api.get('/trending/albums/:n', albumApi.trending);
    api.get('/user/brief/:id', userApi.user_brief);
    api.get('/tags', suppApi.tags);



    test.get('/hello', testApi.get); //Local path in this case /test/hello
    test.get('/albums', testApi.albums);
    test.get('/artists', testApi.artists);
    test.get('/user', testApi.test_db);
    test.get('/user/:id/comments', testApi.get_comments);

    app.use('/api', api);
    app.use('/test', test); //Add all 'test' local paths to global /test/<PATH> routes
}
