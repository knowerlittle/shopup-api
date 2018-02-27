const mongoose = require('mongoose');

function dropDB(collection) {
  mongoose.connection.collections[collection].drop();
}

module.exports = dropDB;