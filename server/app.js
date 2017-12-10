require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressJWT = require("express-jwt");
const mongoose = require("mongoose");
const helmet = require('helmet');
const app = express();

const authRoute = require('../components/authentication/routes')

mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true
});
mongoose.Promise = global.Promise;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/auth', authRoute);

app.use('/', expressJWT({
        secret: process.env.SECRET
    })
    .unless({
        path: [{
            url: new RegExp('/auth/*/', 'i')
        }]
    }));


app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            message: 'Unauthorized request.'
        });
    }
    next();
});


module.exports = app