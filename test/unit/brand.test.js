const request = require('supertest');
const app = require('server/app');
const dropDB = require(__root + 'test/utils/dropDB');
const Brand = require(__root + 'services/brand/model');
const brand1 = require(__root + 'test/fixtures/brand1');

const BRANDS = 'brands';

describe('Unit: Brand', () => {
  test('has corret required fields', async done => {
    const brand = await new Brand(brand1);
    await brand.save();

    await dropDB(BRANDS);
    await expect(brand.name).toEqual('test brand');
    await expect(brand.description).toEqual('this is a good brand');
    await expect(brand.users.id).toEqual(123);
    await expect(brand.categories.length).toEqual(3);
    await expect(brand.demographics.length).toEqual(3);
    await expect(brand.cities.length).toEqual(2);
    await done();
  });
});