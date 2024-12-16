const express = require('express')

const userApi = require('./api/users.js');
const songApi = require('./api/songs.js');
const testApi = require('./test/test.js');

module.exports = function (app) {
    const test = express.Router();
    const api = express.Router();

    api.get('/trending/users/:n', userApi.trending);



    test.get('/hello', testApi.get); //Local path in this case /test/hello
    test.get('/albums', testApi.albums);
    test.get('/artists', testApi.artists);
    test.get('/user', testApi.test_db);
    test.get('/user/:id/comments', testApi.get_comments);

    app.use('/api', api);
    app.use('/test', test); //Add all 'test' local paths to global /test/<PATH> routes
}


