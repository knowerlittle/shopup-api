const mongoose = require('mongoose');

const dropDB = async collection => (mongoose.connection.collections[collection].deleteMany({}));

module.exports = dropDB;