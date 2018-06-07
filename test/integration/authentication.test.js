const app = require('server/app');
const { request, dropDB, table, mock,
  model: { 
    User, 
  },
} = require(__root + 'test/utils');

describe('Integration: Social Authentication', () => {
  test('POST /auth : if no user is present it creates a new user with the Social Provider id attached, and returns JWT Token', async () => {
    const mockFacebookUser = mock.createMockUser('facebook', 'random');

    const response = await request(app)
      .post('/auth')
      .send(mockFacebookUser)
    const responseToken = JSON.parse(response.text)["token"];
    const userArray = await User.find({ firstName: mockFacebookUser.firstName });
    const user = userArray[0];

    expect(responseToken).toBeTruthy();
    expect(mockFacebookUser.id).toEqual(user.facebook.id);
    await dropDB(table.USERS);
  });

  test('POST /auth : if a user with the same Social Provider id exists it returns the JWT Token', async () => {
    const mockFacebookUser = mock.createMockUser('facebook', 'random');
    const newUser = await new User({
      email: mockFacebookUser.email,
      firstName: mockFacebookUser.firstName,
      lastName: mockFacebookUser.lastName,
      facebook: {
        id: mockFacebookUser.id, 
      }
    }).save();
    
    const response = await request(app)
      .post('/auth')
      .send(mockFacebookUser);
    const responseToken = JSON.parse(response.text)["token"];

    expect(responseToken).toBeTruthy();
    await dropDB(table.USERS);
  });

  test('POST /auth : if a user exists with a Facebook id and signs in with Google, it will attach the Google id', async () => {
    const mockFacebookUser = mock.createMockUser('facebook', 'fixed');
    const newUser = await new User({
      email: mockFacebookUser.email,
      firstName: mockFacebookUser.firstName,
      lastName: mockFacebookUser.lastName,
      facebook: {
        id: mockFacebookUser.id, 
      }
    }).save();
    const mockGoogleUser = mock.createMockUser('google', 'fixed');

    const response = await request(app)
      .post('/auth')
      .send(mockGoogleUser); 
    const userArray = await User.find({ firstName: mockFacebookUser.firstName });
    const user = userArray[0];

    expect(mockGoogleUser.id).toEqual(user.google.id);
    expect(newUser.facebook.id).toEqual(user.facebook.id);
    await dropDB(table.USERS);
  });

  test('POST /auth : if a user exists with a Google id and signs in with Facebook, it will attach the Facebook id', async () => {
    const mockGoogleUser = mock.createMockUser('google', 'fixed');
    const newUser = await new User({
      email: mockGoogleUser.email,
      firstName: mockGoogleUser.firstName,
      lastName: mockGoogleUser.lastName,
      google: {
        id: mockGoogleUser.id, 
      }
    }).save();
    const mockFacebookUser = mock.createMockUser('facebook', 'fixed');

    const response = await request(app)
      .post('/auth')
      .send(mockFacebookUser); 
    const userArray = await User.find({ firstName: mockGoogleUser.firstName });
    const user = userArray[0];

    expect(mockFacebookUser.id).toEqual(user.facebook.id);
    await dropDB(table.USERS);
  });
});