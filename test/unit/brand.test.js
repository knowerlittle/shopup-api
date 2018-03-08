const request = require('supertest');
const app = require('server/app');
const dropDB = require(__root + 'test/utils/dropDB');
const Brand = require(__root + 'services/brand/model');
const User = require(__root + 'services/user/model');
const brand1 = require(__root + 'test/fixtures/brand1');
const table = require(__root + 'test/utils/dbTables');

describe('Unit: Brand', () => {
  test('has corret required fields', async done => {
    const user = await new User({
      givenName: 'test2',
      email: 'test2@test.com',
    });
    await user.save();

    const brandInfoWithUserId = Object.assign({}, brand1, { users: user.id });

    const brand = await new Brand(brandInfoWithUserId);
    await brand.save();

    await expect(brand.name).toEqual('test brand');
    await expect(brand.description).toEqual('this is a good brand');
    await expect(brand.users.toString()).toEqual(user.id);
    await expect(brand.categories.length).toEqual(3);
    await expect(brand.demographics.length).toEqual(3);
    await expect(brand.cities.length).toEqual(2);
    await dropDB(table.BRANDS);
    await dropDB(table.USERS);
    await done();
  });
});