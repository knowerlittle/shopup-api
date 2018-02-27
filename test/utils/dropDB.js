const mongoose = require('mongoose');

const dropDB = async (collection) => await mongoose.connection.collections[collection].drop();


module.exports = dropDB;