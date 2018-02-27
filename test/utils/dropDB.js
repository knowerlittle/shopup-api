const mongoose = require('mongoose');

const dropDB = async (collection) => (
  await mongoose.connection.collections[collection].drop(async() => {
    await console.log(`${collection} dropped`);
  }));


module.exports = dropDB;