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

const authRoute = require(__root + 'components/authentication/routes');
const userRoute = require(__root + 'components/user/routes');

const databaseOptions = {
  test: process.env.MONGODB_TEST, 
  development: process.env.MONGODB_LOCAL,
};

const databaseUri = databaseOptions[process.env.NODE_ENV];

mongoose.connect(databaseUri, {
  useMongoClient: true,
});

mongoose.Promise = global.Promise;

console.log('databaseUri', databaseUri);

app.get('/hello', (req, res) => res.send('Hello World!'));

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.use(authRoute);
app.use(userRoute);

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
