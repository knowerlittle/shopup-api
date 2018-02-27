const request = require('supertest');
const app = require('server/app');
const Category = require(__root + 'services/category/model');
const Demographic = require(__root + 'services/demography/model');
const dropDB = require(__root + 'test/utils/dropDB');
const category1 = require(__root + 'test/fixtures/category1');
const category2 = require(__root + 'test/fixtures/category2');
const demography1 = require(__root + 'test/fixtures/demography1');
const demography2 = require(__root + 'test/fixtures/demography2');

const collection1 = 'categories';
const collection2 = 'demographics';

describe('Integration: Signup brand', () => {
  test('GET /signup/brand : returns both category and demographics', async done => {
    const cat1 = await new Category(category1);
    const cat2 = await new Category(category2); 
    const demo1 = await new Demographic(demography1); 
    const demo2 = await new Demographic(demography2); 
    await cat1.save();
    await cat2.save();
    await demo1.save();
    await demo2.save();

    const response = await request(app)
      .get('/signup/brand');

    const responseBody = await response.body;

    await dropDB(collection1);
    await expect(responseBody.categories.length).toEqual(2);
    await expect(responseBody.demographics.length).toEqual(2);
    await dropDB(collection2);
    await done();
  });
});