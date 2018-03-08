const request = require('supertest');
const app = require('server/app');
const Category = require(__root + 'services/category/model');
const Demographic = require(__root + 'services/demography/model');
const Brand = require(__root + 'services/brand/model');
const User = require(__root + 'services/user/model');
const createToken = require(__root + 'services/authentication/createToken');
const dropDB = require(__root + 'test/utils/dropDB');
const table = require(__root + 'test/utils/dbTables');
const category1 = require(__root + 'test/fixtures/category1');
const category2 = require(__root + 'test/fixtures/category2');
const demography1 = require(__root + 'test/fixtures/demography1');
const demography2 = require(__root + 'test/fixtures/demography2');
const brand1 = require(__root + 'test/fixtures/brand1')
const brand2 = require(__root + 'test/fixtures/brand2')

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

    await expect(responseBody.categories.length).toEqual(2);
    await expect(responseBody.demographics.length).toEqual(2);
    await dropDB(table.CATEGORIES);
    await dropDB(table.DEMOGRAPHICS);
    await done();
  });

  test('POST /brand : creates a brand; attaches user Id to brand; attaches brand Id to user; returns updated user and brand', async done => {
    const user = await new User({
      givenName: 'test1',
      email: 'test1@test.com',
    });
    await user.save();

    const token = await createToken(user);

    const response = await request(app)
      .post('/brand')
      .send(brand1)
      .set('Authorization', 'Bearer ' + token);

    const { user : responseUser, brand : responseBrand } = response.body;

    await expect(responseUser.brand.id).toEqual(responseBrand.id);
    await expect(responseBrand.users.id).toEqual(responseUser.id);
    await dropDB(table.USERS);
    await dropDB(table.BRANDS);
    await done();
  });

  test('GET /signin : if a user has a brand, it returns the user, the brand and correct signin type', async done => {
    const user = await new User({
      givenName: 'test2',
      email: 'test2@test.com',
    });
    await user.save();
    const brandInfoWithUserId = Object.assign({}, brand2, { users: user.id });
    
    const brand = await new Brand(brandInfoWithUserId);
    await brand.save();
    user.set({ brand: brand.id });
    await user.save();

    const token = await createToken(user);

    const response = await request(app)
      .get('/signin')
      .set('Authorization', 'Bearer ' + token);
    
    const { user : responseUser, brand : responseBrand, type } = response.body;

    await expect(responseUser.brand.id).toEqual(responseBrand.id);
    await expect(responseBrand.users.id).toEqual(responseUser.id);
    await expect(type).toEqual('brand');
    await dropDB(table.USERS);
    await dropDB(table.BRANDS);
    await done();
  });

  test('GET /signin : if a user does not have either a brand or space attached it returns the user with type new', async done => {
    const user = await new User({
      givenName: 'test2',
      email: 'test2@test.com',
    });
    await user.save();
    
    const token = await createToken(user);

    const response = await request(app)
      .get('/signin')
      .set('Authorization', 'Bearer ' + token);

    const { user : { _id : responseUserId }, type } = response.body;

    await expect(responseUserId).toEqual(user.id);
    await expect(type).toEqual('new');
    await dropDB(table.USERS);
    await done();
  })

});