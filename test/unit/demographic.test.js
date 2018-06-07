const app = require('server/app');
const { dropDB, table, mock,
  model: {
    Demographic,
  }
} = require(__root + 'test/utils');

describe('Unit: Demographic', () => {
  test('has correct required fields', async () => {
    const demographic = await new Demographic(mock.demographic1).save();

    expect(demographic.name).toEqual('hipster');
    await dropDB(table.DEMOGRAPHICS);
  });
});