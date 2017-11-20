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


app.use('/', expressJWT({ secret: process.env.SECRET })
    .unless({
        path: [
            { url: '/brand/login', methods: ['POST'] },
            { url: '/brand/register', methods: ['POST'] },
            { url: '/space/login', methods: ['POST'] },
            { url: '/space/register', methods: ['POST'] }
        ]
    }));


app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Unauthorized request' });
    }
    next();
});


module.exports = app;