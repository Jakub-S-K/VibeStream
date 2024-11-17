const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');

require('dotenv').config({ path: `../.env`}); //Use global env

const app = express();

app.set('trust proxy', 1);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

require('./routes/routers.js')(app); //populate routes from ./routers/

app.listen(process.env.BACKEND_PORT || 3000, () => console.log("Server is running on PORT " + process.env.PORT))