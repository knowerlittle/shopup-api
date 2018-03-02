const request = require('supertest');
const app = require('server/app');
const Category = require(__root + 'services/category/model');
const Demographic = require(__root + 'services/demography/model');
const User = require(__root + 'services/user/model');
const createToken = require(__root + 'test/utils/createToken');
const dropDB = require(__root + 'test/utils/dropDB');
const category1 = require(__root + 'test/fixtures/category1');
const category2 = require(__root + 'test/fixtures/category2');
const demography1 = require(__root + 'test/fixtures/demography1');
const demography2 = require(__root + 'test/fixtures/demography2');
const brand1 = require(__root + 'test/fixtures/brand1')

const CATEGORIES = 'categories';
const DEMOGRAPHICS = 'demographics';
const USERS = 'users';
const BRANDS = 'brands';

describe('Integration: Signup', () => {
  test('GET /signup : returns both category and demographics for use in the signup process', async done => {
    const cat1 = await new Category(category1);
    const cat2 = await new Category(category2); 
    const demo1 = await new Demographic(demography1); 
    const demo2 = await new Demographic(demography2); 
    await cat1.save();
    await cat2.save();
    await demo1.save();
    await demo2.save();

    const response = await request(app)
      .get('/signup');

    const responseBody = await response.body;

    await dropDB(CATEGORIES);
    await dropDB(DEMOGRAPHICS);
    await expect(responseBody.categories.length).toEqual(2);
    await expect(responseBody.demographics.length).toEqual(2);
    await done();
  });

  test('POST /signup/brand : creates a brand, attaches user ID to it, also attaches brandID to correspending user, returns updated user', async done => {
    const user = await new User({
      givenName: 'test1',
      email: 'test1@test.com',
    });
    await user.save();

    const token = await createToken(user);

    const response = await request(app)
      .post('/signup/brand')
      .send(brand1)
      .set('Authorization', 'Bearer ' + token);

    const updatedUser = response.body;
    console.log('updated', updatedUser);

    await dropDB(USERS);
    await dropDB(BRANDS);
    await expect(updatedUser.brand[0].name).toEqual('test brand');
    await done();
  });

});