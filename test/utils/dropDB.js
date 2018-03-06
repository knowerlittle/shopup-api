const mongoose = require('mongoose');

const dropDB = async collection => (mongoose.connection.collections[collection].drop());

module.exports = dropDB;