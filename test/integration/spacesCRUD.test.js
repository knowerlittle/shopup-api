const request = require('supertest');
const app = require('server/app');
const User = require(__root + 'services/user/model');
const createToken = require(__root + 'services/authentication/createToken');
const dropDB = require(__root + 'test/utils/dropDB');
const space1 = require(__root + 'test/fixtures/space1');
const space2 = require(__root + 'test/fixtures/space2');

const USERS = 'users';
const BRANDS = 'brands'

