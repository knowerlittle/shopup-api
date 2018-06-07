const app = require('server/app');
const { request, dropDB, table, mock,
  model: {
    Area
  },
} = require(__root + 'test/utils');

describe('Unit: Area', () => {
  test('has correct required fields', async () => {
    const area = await new Area(mock.area1).save();

    expect(area.name).toEqual('zone 1');
    expect(area.approved).toEqual(false);
    expect(area.disabled).toEqual(false);
    await dropDB(table.AREAS)
  });
});