const request = require('supertest');
const app = require('server/app');
const Demographic = require(__root + 'services/demographic/model');
const dropDB = require(__root + 'test/utils/dropDB');

const collection = 'demographics';

describe('Unit: Demographic', () => {
  test('has correct fields', async done => {
    const demographic = await new Demographic({
      name: 'hipsters',
    });
    demographic.save();
    await expect(demographic.name).toEqual('hipsters');
    await dropDB(collection);
    await done();
  });
});