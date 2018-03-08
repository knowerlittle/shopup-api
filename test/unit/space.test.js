const request = require('supertest');
const app = require('server/app');
const dropDB = require(__root + 'test/utils/dropDB');
const Space = require(__root + 'services/space/model');
const User = require(__root + 'services/user/model');
const space1 = require(__root + 'test/fixtures/space1');
const table = require(__root + 'test/utils/dbTables');

describe('Unit: Space', () => {
  test('has correct required fields', async done => {
    const user = await new User({
      givenName: 'testUesr',
      email: 'test@testing.com',
    });
    await user.save();

    const spaceInfoWithUserId = Object.assign({}, space1, { users: user.id });

    const space = await new Space(spaceInfoWithUserId);
    await space.save();

    await expect(space.name).toEqual('test space');
    await expect(space.description).toEqual('this is a good space');
    await expect(space.users.toString()).toEqual(user.id);
    await expect(space.categories.length).toEqual(3);
    await expect(space.demographics.length).toEqual(3);
    await expect(space.cities.length).toEqual(2);
    await dropDB(table.SPACES);
    await dropDB(table.USERS);
    await done();
  });
});