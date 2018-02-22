// const request = require('supertest');
// const app = require('server/app');
// const User = require(__root + 'services/user/model');
// const createToken = require(__root + 'test/utils/createToken');

// describe('Integration: User', () => {
//   test('GET /user/:id with JWT token should return correct user', async () => {
//     const user = await new User({
//         givenName: 'test',
//         email: 'test@test.com',
//     });
//     user.save();
//     const token = createToken(user);

//     const response = await request(app)
//       .get(`/user/${user.id}`)
//       .set('Authorization', 'Bearer ' + token);

//     await expect(JSON.parse(response.text)["_id"]).toBe(user.id);
//     await User.remove(user);
//   });

//   test('GET /user/:id without a JWT token be an Unauthorized Request', async () => {
//     const user = await new User({
//         givenName: 'test',
//         email: 'test2@test.com',
//     });
//     user.save();

//     const response = await request(app)
//       .get(`/user/${user.id}`)

//     await expect(response.statusCode).toBe(401);
//     await User.remove(user);
//   });
// });