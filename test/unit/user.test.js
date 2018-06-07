const app = require('server/app');
const { dropDB, table,
  model: {
    User,
  }
} = require(__root + 'test/utils');

describe('Unit: User', () => {
  test('has correct required fields', async () => {
    const user = await new User({ email: 'testemail@email.com' }).save();

    expect(user.email).toEqual('testemail@email.com');
    await dropDB(table.USERS);
  });
});