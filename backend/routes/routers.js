const express = require('express')

const testApi = require('./test/test.js');

module.exports = function (app) {
    const test = express.Router();
    
    test.get('/hello', testApi.get); //Local path in this case /test/hello

    app.use('/test', test); //Add all 'test' local paths to global /test/<PATH> routes
}