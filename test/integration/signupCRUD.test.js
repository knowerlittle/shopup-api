const app = require('server/app');
const { request, dropDB, table, createUserWithToken, createToken, mock,
  model: { 
    Category, 
    Demographic, 
    Brand 
  },
} = require(__root + 'test/utils');


describe('Integration: Signup', () => {
  test('GET /signup : returns both category and demographics for use in the signup process', async () => {
    await new Category(mock.category1).save();
    await new Category(mock.category2).save(); 
    await new Demographic(mock.demography1).save(); 
    await new Demographic(mock.demography2).save(); 

    const response = await request(app)
      .get('/signup');

    const responseBody = response.body;

    expect(responseBody.categories.length).toEqual(2);
    expect(responseBody.demographics.length).toEqual(2);
    await dropDB(table.CATEGORIES);
    await dropDB(table.DEMOGRAPHICS);
  });

  test('POST /brand : creates a brand; attaches user Id to brand; attaches brand Id to user; returns updated user and brand', async () => {
    const { user, token } = await createUserWithToken();

    const response = await request(app)
      .post('/brand')
      .send(mock.brand1)
      .set('Authorization', 'Bearer ' + token);

    const { user : responseUser, brand : responseBrand } = response.body;

    expect(responseUser.brand.id).toEqual(responseBrand.id);
    expect(responseBrand.users.id).toEqual(responseUser.id);
    await dropDB(table.USERS);
    await dropDB(table.BRANDS);
  });

  test('GET /signin : if a user has a brand, it returns the user, the brand and correct signin type', async () => {
    const { user, token } = await createUserWithToken();
    const brandInfoWithUserId = Object.assign({}, mock.brand2, { users: user.id });
    
    const brand = await new Brand(brandInfoWithUserId).save();
    user.set({ brand: brand.id });
    await user.save();

    const response = await request(app)
      .get('/signin')
      .set('Authorization', 'Bearer ' + token);

    const { user : responseUser, brand : responseBrand, type } = response.body;

    expect(responseUser.brand.id).toEqual(responseBrand.id);
    expect(responseBrand.users.id).toEqual(responseUser.id);
    expect(type).toEqual('brand');
    await dropDB(table.USERS);
    await dropDB(table.BRANDS);
  });

  test('GET /signin : if a user does not have either a brand or space attached it returns the user with type new', async () => {
    const { user, token } = await createUserWithToken();

    const response = await request(app)
      .get('/signin')
      .set('Authorization', 'Bearer ' + token);

    const { user : { _id : responseUserId }, type } = response.body;

    expect(responseUserId).toEqual(user.id);
    expect(type).toEqual('new');
    await dropDB(table.USERS);
  });

  // test('createToken', async done => {
  //   user = await new User({
  //     _id: '5aa199696bd0515f8af36138',
  //     givenName: 'Noah',
  //     lastName: 'Pollock',
  //     email: 'knowerlittle@gmail.com',
  //   });
  //   await user.save();
  
  //   const token = await createToken(user);
    
  //   console.log('u', user, 't', token);
  //   await done();
  // });
});