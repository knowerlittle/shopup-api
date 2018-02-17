require('dotenv').config();
const path = require('path');
global.__root = path.resolve('.') + '/';
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const database = require(__root + 'config/db');
const routes = require(__root + 'server/routes');

const databaseUri = database[process.env.NODE_ENV];

mongoose.connect(databaseUri, {
  useMongoClient: true,
});

mongoose.Promise = global.Promise;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.use(...routes);

app.use(
  '/',
  expressJWT({
    secret: process.env.SECRET,
  }).unless({
    path: [
      {
        url: new RegExp('/auth/*/', 'i'),
      },
    ],
  }),
);

app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'Unauthorized request.',
    });
  }
  next();
});

module.exports = app;
