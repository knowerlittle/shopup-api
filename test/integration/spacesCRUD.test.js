const app = require('server/app');
const { request, dropDB, table, createUserWithToken, createToken, mock,
  model: {
    User,
    Space,
  },
} = require(__root + 'test/utils');

describe('Integration: Space', () => {
  test('GET /spaces : returns all spaces', async () => {
    const spaceA = await new Space(mock.space1).save();
    const spaceB = await new Space(mock.space2).save();

    const { user, token } = await createUserWithToken();

    const response = await request(app)
      .get('/spaces')
      .set('Authorization', 'Bearer ' + token);

    const { spaces } = response.body;
    expect(spaces[0]["_id"]).toEqual(spaceA.id);
    expect(spaces[1]["_id"]).toEqual(spaceB.id);
    await dropDB(table.SPACES);
    await dropDB(table.USERS);
  });

  test('GET /spaces:id : returns requested space', async () => {
    const spaceA = await new Space(mock.space1).save();
    const spaceB = await new Space(mock.space2).save();

    const { user, token } = await createUserWithToken();

    const response = await request(app)
      .get(`/spaces/${spaceA.id}`)
      .set('Authorization', 'Bearer ' + token);

    const space = response.body;
    
    expect(space["_id"]).toEqual(spaceA.id);
    expect(space.name).toEqual('test space');
    await dropDB(table.SPACES);
    await dropDB(table.USERS);
  });
});

