const express = require('express');
const cors = require('cors');
const passport = require("passport");
var bodyParser = require('body-parser');
const jwt_strategy = require('./routes/api/auth.js').strategy;

require('dotenv').config({ path: __dirname + `/../.env`}); //Use global env

const app = express();

app.set('trust proxy', 1);
app.use('/assets', express.static('assets'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

require('./routes/routers.js')(app); //populate routes from ./routers/

passport.use(jwt_strategy);

module.exports = app;

if (require.main === module) {
    const db_rdy = require('./db_conn.js').conn_rdy().then(good => {
        if (good) {
            app.listen(process.env.BACKEND_PORT || 3999, () => console.log("Server is running on PORT " + process.env.BACKEND_PORT))
        } else {
            console.error("Failed to connect to database");
            process.exit(-1);
        }
    })
}