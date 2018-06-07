const app = require('server/app');
const { request, dropDB, table, mock, createToken,
  model: { 
    User, 
    Brand, 
  },
} = require(__root + 'test/utils');

describe('Integration: User', () => {
  test('GET /user/:id : with JWT token should return correct user', async () => {
    const user = await new User({
        givenName: 'test1',
        email: 'test1@test.com',
    }).save();

    const token = await createToken(user);

    const response = await request(app)
      .get(`/user/${user.id}`)
      .set('Authorization', 'Bearer ' + token);

    expect(JSON.parse(response.text)["_id"]).toBe(user.id);
    await dropDB(table.USERS);
  });

  test('GET /user/:id : without a JWT token be an Unauthorized Request', async () => {
    const user = await new User({
        givenName: 'test2',
        email: 'test2@test.com',
    }).save();

    const response = await request(app)
      .get(`/user/${user.id}`)

    expect(response.statusCode).toBe(401);
    await dropDB(table.USERS);
  });
});