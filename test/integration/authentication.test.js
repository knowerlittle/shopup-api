const request = require('supertest');
const app = require('server/app');
const facebookUser = require(__root + 'test/fixtures/facebookUser');
const googleUser = require(__root + 'test/fixtures/googleUser');
const User = require(__root + 'services/user/model');
const { USERS } = require(__root + 'test/utils/dbTables');
const dropDB = require(__root + 'test/utils/dropDB');

describe('Integration: Social Authentication', () => {
  // test('POST /auth : if no user is present it creates a new user with the Social Provider id attached, and returns JWT Token', async () => {
  //   const response = await request(app)
  //     .post('/auth')
  //     .send(mockFacebookUser)

  //   const responseToken = JSON.parse(response.text)["token"];
  //   const userArray = await User.find({ givenName: mockFacebookUser.givenName });
  //   const user = userArray[0];
  //   console.log('user1', user);
  //   console.log('r', responseToken);

  //   expect(responseToken).toBeTruthy();
  //   expect(mockFacebookUser.id).toEqual(user.facebook.id);
  //   await dropDB(USERS);
  // });

  // test('POST /auth : if a user with the same Social Provider id exists it returns the JWT Token', async () => {
  //   await new User({
  //     email: mockFacebookUser.email,
  //     givenName: mockFacebookUser.givenName,
  //     familyName: mockFacebookUser.familyName,
  //     facebook: {
  //       id: mockFacebookUser.id, 
  //     }
  //   });
    
  //   const response = await request(app)
  //     .post('/auth')
  //     .send(mockFacebookUser);
  //   const responseToken = JSON.parse(response.text)["token"];

  //   expect(responseToken).toBeTruthy();
  //   await dropDB(USERS);
  // });

  test('POST /auth : if a user exists with a Facebook id and signs in with Google, it will attach the Google id', async () => {
    const mockUser = facebookUser.random;
    console.log('mock', mockUser);
    
    const newUser = await new User({
      email: mockUser.email,
      givenName: mockUser.givenName,
      familyName: mockUser.familyName,
      facebook: {
        id: mockUser.id, 
      }
    }).save();
  //  newUser.save(); 
    // const response = await request(app)
    //   .post('/auth')
    //   .send(mockGoogleUser); 
    
    // console.log('response', response);

    // const userArray = await User.find({ givenName: mockFacebookUser.givenName });
    // console.log('UserArray', userArray);
    // const user = userArray[0];
    // console.log('U', user);
    // console.log('google', user.facebook.id);
    // expect(mockGoogleUser.id).toEqual(user.google.id);
    await dropDB(USERS);
  });

  // test('POST /auth : if a user exists with a Google id and signs in with Facebook, it will attach the Facebook id', async () => {
  //   await new User({
  //     email: mockGoogleUser.email,
  //     givenName: mockGoogleUser.givenName,
  //     familyName: mockGoogleUser.familyName,
  //     google: {
  //       id: mockGoogleUser.id, 
  //     }
  //   });
  //   const response = await request(app)
  //     .post('/auth')
  //     .send(mockFacebookUser); 

  //   const userArray = await User.find({ givenName: mockGoogleUser.givenName });
  //   const user = userArray[0];
  //   console.log('usera', userArray);
  //   console.log('user 2', user);

  //   expect(mockFacebookUser.id).toEqual(user.facebook.id);
  //   await dropDB(USERS);
  // });
});