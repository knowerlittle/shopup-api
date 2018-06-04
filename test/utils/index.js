const request = require('supertest');
const dropDB = require(__root + 'test/utils/dropDB');
const table = require(__root + 'test/utils/dbTables');
const createToken = require(__root + 'services/authentication/createToken');
const createUserWithToken = require(__root + 'test/utils/createUserWithToken');
const mock = require(__root + 'test/fixtures');
const model = require(__root + 'test/utils/allModels');

module.exports = {
  request,
  dropDB,
  table,
  createUserWithToken,
  createToken,
  mock,
  model,
};