const request = require('supertest');
const app = require('server/app');
const mockUserFromFacebook = require(__root + 'test/fixtures/mockUserFromFacebook');
const User = require(__root + 'components/user/model');
const createToken = require(__root + 'test/utils/createToken');

describe('Social Authentication', () => {
  test('POST /auth/facebook creates a new user with facebook id attached', async () => {
    const response = await request(app)
      .post('/auth/facebook')
      .send(mockUserFromFacebook)

    const user = await User.find({ givenName: mockUserFromFacebook.firstName });

    await expect(mockUserFromFacebook.id).toEqual(user[0].facebook.id);
  });

  // test('')
});