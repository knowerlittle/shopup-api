const request = require('supertest');
const app = require('server/app');
const Category = require(__root + 'services/category/model');
const dropDB = require(__root + 'test/utils/dropDB');

const CATEGORIES  = 'categories';

describe('Unit: Category', () => {
  test('has correct required fields', async done => {
    const category = await new Category({
      name: 'test cat',
      description: 'test category',
    });
    await category.save();

    await expect(category.name).toEqual('test cat');
    await expect(category.description).toEqual('test category');
    await dropDB(CATEGORIES);
    await done();
  });
});