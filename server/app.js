const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressJWT = require("express-jwt");
const mongoose = require("mongoose");
const passport = require("passport");
const helmet = require('helmet');
// const cors = require('cors')
const app = express();

const authRoute = require('../components/authentication/routes')

require('dotenv').config();
require("../components/authentication/passport")(passport);

mongoose.connect('mongodb://localhost/popin', {
    useMongoClient: true
});
mongoose.Promise = global.Promise;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(passport.initialize());
// app.use(cors);
app.use('/auth', authRoute);

app.use('/', expressJWT({ 
        secret: process.env.SECRET
    })
    .unless({
        path: [{
                url: new RegExp('/auth/*/', 'i')
            }
        ]
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