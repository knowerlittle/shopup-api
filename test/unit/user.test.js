const request = require('supertest');
const app = require('server/app');
const dropDB = require(__root + 'test/utils/dropDB');
const User = require(__root + 'services/user/model');

const USERS = 'users';

describe('Unit: User', () => {
  test('has correct required fields', async done => {
    const user = await new User({email: 'testemail@email.com'});
    await user.save();

    await expect(user.email).toEqual('testemail@email.com');
    await dropDB(USERS);
    await done();
  });
});