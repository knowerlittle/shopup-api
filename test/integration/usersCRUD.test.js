const request = require('supertest');
const app = require('server/app');
const User = require(__root + 'services/user/model');
const Brand = require(__root + 'services/brand/model');
const createToken = require(__root + 'services/authentication/createToken');
const dropDB = require(__root + 'test/utils/dropDB');
const table = require(__root + 'test/utils/dbTables');

describe('Integration: User', () => {
  test('GET /user/:id : with JWT token should return correct user', async done => {
    const user = await new User({
        givenName: 'test1',
        email: 'test1@test.com',
    });
    await user.save();

    const token = await createToken(user);

    const response = await request(app)
      .get(`/user/${user.id}`)
      .set('Authorization', 'Bearer ' + token);

    await expect(JSON.parse(response.text)["_id"]).toBe(user.id);
    await dropDB(table.USERS);
    await done();
  });

  test('GET /user/:id : without a JWT token be an Unauthorized Request', async done => {
    const user = await new User({
        givenName: 'test2',
        email: 'test2@test.com',
    });
    await user.save();

    const response = await request(app)
      .get(`/user/${user.id}`)

    await expect(response.statusCode).toBe(401);
    await dropDB(table.USERS);
    await done();
  });
});