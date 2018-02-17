require('dotenv').config();

const databaseOptions = {
  test: process.env.MONGODB_TEST, 
  development: process.env.MONGODB_LOCAL,
};

module.exports = databaseOptions;
