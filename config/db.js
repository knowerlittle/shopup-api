require('dotenv').config();
const mongoose = require('mongoose');

const databaseOptions = {
  test: process.env.MONGODB_TEST, 
  development: process.env.MONGODB,
};

const databaseUri = databaseOptions[process.env.NODE_ENV];

mongoose.connect(databaseUri, {
  useMongoClient: true,
});

mongoose.Promise = global.Promise;

