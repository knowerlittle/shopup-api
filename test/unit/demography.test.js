const request = require('supertest');
const app = require('server/app');
const Demography = require(__root + 'services/demography/model');
const dropDB = require(__root + 'test/utils/dropDB');

const DEMOGRAPHICS = 'demographics';

describe('Unit: Demographic', () => {
  test('has correct required fields', async done => {
    const demography = await new Demography({
      name: 'hipsters',
    });
    await demography.save();

    await expect(demography.name).toEqual('hipsters');
    await dropDB(DEMOGRAPHICS);
    await done();
  });
});