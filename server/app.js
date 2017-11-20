const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressJWT = require("express-jwt");
const helmet = require('helmet');
const app = express();

require('dotenv').config();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


module.exports = app;