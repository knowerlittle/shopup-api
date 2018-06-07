const app = require('server/app');
const { dropDB, table, mock,
  model: {
    Space,
    User,
  }
} = require(__root + 'test/utils');

describe('Unit: Space', () => {
  test('has correct required fields', async () => {
    const user = await new User({
      givenName: 'testUesr',
      email: 'test@testing.com',
    }).save();

    const spaceInfoWithUserId = Object.assign({}, mock.space1, { users: user.id });

    const space = await new Space(spaceInfoWithUserId).save();

    expect(space.name).toEqual('test space');
    expect(space.description).toEqual('this is a good space');
    expect(space.users.toString()).toEqual(user.id);
    expect(space.categories.length).toEqual(3);
    expect(space.demographics.length).toEqual(3);
    expect(space.cities.length).toEqual(2);
    await dropDB(table.SPACES);
    await dropDB(table.USERS);
  });
});