const mongoose = require('mongoose');

const dropDB = (collection) => (mongoose.connection.collections[collection].drop());

module.exports = dropDB;