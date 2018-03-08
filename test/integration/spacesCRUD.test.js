const request = require('supertest');
const app = require('server/app');
const createToken = require(__root + 'services/authentication/createToken');
const dropDB = require(__root + 'test/utils/dropDB');
const User = require(__root + 'services/user/model');
const Space = require(__root + 'services/space/model');
const space1 = require(__root + 'test/fixtures/space1');
const space2 = require(__root + 'test/fixtures/space2');
const table = require(__root + 'test/utils/dbTables');
const createUserWithToken = require(__root + 'test/utils/createUserWithToken');

describe('Integration: Space', () => {
  test('GET /spaces : returns all spaces', async done => {
    const spaceA = await new Space(space1);
    const spaceB = await new Space(space2);
    await spaceA.save();
    await spaceB.save();

    const { user, token } = await createUserWithToken();

    const response = await request(app)
      .get('/spaces')
      .set('Authorization', 'Bearer ' + token);

    const { spaces } = response.body;
    await dropDB(table.SPACES);
    await dropDB(table.USERS);
    await expect(spaces[0]["_id"]).toEqual(spaceA.id);
    await expect(spaces[1]["_id"]).toEqual(spaceB.id);
    await done();
  });
});

