const request = require('supertest');
const app = require('server/app');
const mockUserFromFacebook = require(__root + 'test/fixtures/mockUserFromFacebook');
const User = require(__root + 'services/user/model');

const JWT = require('jsonwebtoken')
describe('Social Authentication', () => {
  test('POST /auth/facebook : if no user is present it creates a new user with facebook id attached, and returns JWT Token', async () => {
    const mockUser = Object.assign({}, mockUserFromFacebook);
    const response = await request(app)
      .post('/auth/facebook')
      .send(mockUser)

    const responseToken = JSON.parse(response.text)["token"];
    const userArray = await User.find({ givenName: mockUser.firstName });
    const user = userArray[0];

    await expect(responseToken).toBeTruthy()
    await expect(mockUser.id).toEqual(user.facebook.id);
    await User.remove(user);
  });

  test('POST /auth/facebook : if a user with the same facebook id is exists it returns the JWT Token', async () => {
    const mockUser = Object.assign({}, mockUserFromFacebook);
    const user = await new User({
      email: mockUser.email,
      givenName: mockUser.givenName,
      familyName: mockUser.familyName,
      facebook: {
        id: mockUser.id, 
      }
    });
    const response = await request(app)
      .post('/auth/facebook')
      .send(mockUser);
    const responseToken = JSON.parse(response.text)["token"];

    await expect(responseToken).toBeTruthy();
    await User.remove(user);
  });

  // test('POST /auth/facebook return' )
    // const responseToken =;
  // test('')
});