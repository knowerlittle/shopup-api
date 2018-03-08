const request = require('supertest');
const app = require('server/app');
const dropDB = require(__root + 'test/utils/dropDB');
const Area = require(__root + 'services/area/model');
const area1 = require(__root + 'test/fixtures/area1');

describe('Unit: Area', () => {
  test('has correct required fields', async done => {
    const area = await new Area(area1);
    await area.save();

    await expect(area.name).toEqual('zone 1');
    await expect(area.approved).toEqual(false);
    await expect(area.disabled).toEqual(false);
    await done();
  });
});