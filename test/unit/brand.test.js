const app = require('server/app');
const { request, dropDB, table, mock,
  model: {
    User, 
    Brand,
  },
} = require(__root + 'test/utils');

describe('Unit: Brand', () => {
  test('has corret required fields', async () => {
    const user = await new User({
      givenName: 'test2',
      email: 'test2@test.com',
    }).save();

    const brandInfoWithUserId = Object.assign({}, mock.brand1, { users: user.id });

    const brand = await new Brand(brandInfoWithUserId).save();

    expect(brand.name).toEqual('test brand');
    expect(brand.description).toEqual('this is a good brand');
    expect(brand.users.toString()).toEqual(user.id);
    expect(brand.categories.length).toEqual(3);
    expect(brand.demographics.length).toEqual(3);
    expect(brand.cities.length).toEqual(2);
    await dropDB(table.BRANDS);
    await dropDB(table.USERS);
  });
});