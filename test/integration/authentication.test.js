const request = require('supertest');
const app = require('server/app');
const mockFacebookUser = require(__root + 'test/fixtures/mockFacebookUser');
const mockGoogleUser = require(__root + 'test/fixtures/mockGoogleUser');
const User = require(__root + 'services/user/model');

describe('Social Authentication', () => {
  test('POST /auth : if no user is present it creates a new user with the Social Provider id attached, and returns JWT Token', async done => {
    const response = await request(app)
      .post('/auth')
      .send(mockFacebookUser)

    const responseToken = JSON.parse(response.text)["token"];
    const userArray = await User.find({ givenName: mockFacebookUser.firstName });
    const user = userArray[0];

    await expect(responseToken).toBeTruthy()
    await expect(mockFacebookUser.id).toEqual(user.facebook.id);
    await User.remove(user);
    await done();
  });

  test('POST /auth : if a user with the same Social Provider id exists it returns the JWT Token', async done => {
    const user = new User({
      email: mockFacebookUser.email,
      givenName: mockFacebookUser.givenName,
      familyName: mockFacebookUser.familyName,
      facebook: {
        id: mockFacebookUser.id, 
      }
    });
    const response = await request(app)
      .post('/auth')
      .send(mockFacebookUser);
    const responseToken = JSON.parse(response.text)["token"];

    await expect(responseToken).toBeTruthy();
    await User.remove(user);
    await done();
  });

  test('POST /auth : if a user exists with a Facebook id and signs in with Google, it will attach the Google id', async done => {
    new User({
      email: mockFacebookUser.email,
      givenName: mockFacebookUser.firstName,
      familyName: mockFacebookUser.lastName,
      facebook: {
        id: mockFacebookUser.id, 
      }
    });
    const response = await request(app)
      .post('/auth')
      .send(mockGoogleUser); 

    const userArray = await User.find({ givenName: mockFacebookUser.firstName });
    const user = userArray[0];

    await expect(mockGoogleUser.id).toEqual(user.google.id);
    await User.remove(user);
    await done();
  });

  test('POST /auth : if a user exists with a Google id and signs in with Facebook, it will attach the Facebook id', async done => {
    await new User({
      email: mockGoogleUser.email,
      givenName: mockGoogleUser.firstName,
      familyName: mockGoogleUser.lastName,
      facebook: {
        id: mockGoogleUser.id, 
      }
    });
    const response = await request(app)
      .post('/auth')
      .send(mockFacebookUser); 

    const userArray = await User.find({ givenName: mockGoogleUser.firstName });
    const user = userArray[0];

    await expect(mockFacebookUser.id).toEqual(user.facebook.id);
    await User.remove(user);
    await done();
  });
});