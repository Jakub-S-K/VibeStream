const express = require('express')

const testApi = require('./test/test.js');

module.exports = function (app) {
    const test = express.Router();
    
    test.get('/hello', testApi.get); //Local path in this case /test/hello
    test.get('/albums', testApi.albums);
    test.get('/artists', testApi.artists);
    test.get('/user', testApi.test_db);

    app.use('/test', test); //Add all 'test' local paths to global /test/<PATH> routes
}


