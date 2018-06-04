const request = require('supertest');
const app = require('server/app');
const { createMockUser } = require(__root + 'test/fixtures');
const User = require(__root + 'services/user/model');
const { USERS } = require(__root + 'test/utils/dbTables');
const dropDB = require(__root + 'test/utils/dropDB');

describe('Integration: Social Authentication', () => {
  test('POST /auth : if no user is present it creates a new user with the Social Provider id attached, and returns JWT Token', async () => {
    const mockFacebookUser = createMockUser('facebook', 'random');

    const response = await request(app)
      .post('/auth')
      .send(mockFacebookUser)
    const responseToken = JSON.parse(response.text)["token"];
    const userArray = await User.find({ givenName: mockFacebookUser.givenName });
    const user = userArray[0];

    expect(responseToken).toBeTruthy();
    expect(mockFacebookUser.id).toEqual(user.facebook.id);
    await dropDB(USERS);
  });

  test('POST /auth : if a user with the same Social Provider id exists it returns the JWT Token', async () => {
    const mockFacebookUser = createMockUser('facebook', 'random');
    const newUser = await new User({
      email: mockFacebookUser.email,
      givenName: mockFacebookUser.givenName,
      familyName: mockFacebookUser.familyName,
      facebook: {
        id: mockFacebookUser.id, 
      }
    }).save();
    
    const response = await request(app)
      .post('/auth')
      .send(mockFacebookUser);
    const responseToken = JSON.parse(response.text)["token"];

    expect(responseToken).toBeTruthy();
    await dropDB(USERS);
  });

  test('POST /auth : if a user exists with a Facebook id and signs in with Google, it will attach the Google id', async () => {
    const mockFacebookUser = createMockUser('facebook', 'fixed');
    const newUser = await new User({
      email: mockFacebookUser.email,
      givenName: mockFacebookUser.givenName,
      familyName: mockFacebookUser.familyName,
      facebook: {
        id: mockFacebookUser.id, 
      }
    }).save();
    const mockGoogleUser = createMockUser('google', 'fixed');

    const response = await request(app)
      .post('/auth')
      .send(mockGoogleUser); 
    const userArray = await User.find({ givenName: mockFacebookUser.givenName });
    const user = userArray[0];

    expect(mockGoogleUser.id).toEqual(user.google.id);
    expect(newUser.facebook.id).toEqual(user.facebook.id);
    await dropDB(USERS);
  });

  test('POST /auth : if a user exists with a Google id and signs in with Facebook, it will attach the Facebook id', async () => {
    const mockGoogleUser = createMockUser('google', 'fixed');
    const newUser = await new User({
      email: mockGoogleUser.email,
      givenName: mockGoogleUser.givenName,
      familyName: mockGoogleUser.familyName,
      google: {
        id: mockGoogleUser.id, 
      }
    }).save();
    const mockFacebookUser = createMockUser('facebook', 'fixed');

    const response = await request(app)
      .post('/auth')
      .send(mockFacebookUser); 
    const userArray = await User.find({ givenName: mockGoogleUser.givenName });
    const user = userArray[0];

    expect(mockFacebookUser.id).toEqual(user.facebook.id);
    await dropDB(USERS);
  });
});