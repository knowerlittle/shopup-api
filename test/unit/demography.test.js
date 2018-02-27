const request = require('supertest');
const app = require('server/app');
const Demography = require(__root + 'services/demography/model');
const dropDB = require(__root + 'test/utils/dropDB');

const collection = 'demographics';

describe('Unit: Demographic', () => {
  test('has correct fields', async done => {
    const demography = await new Demography({
      name: 'hipsters',
    });
    await demography.save();

    await dropDB(collection);
    await expect(demography.name).toEqual('hipsters');
    await done();
  });
});