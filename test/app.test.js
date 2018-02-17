const request = require('supertest');
const app = require('server/app')
const User = require(__root + 'components/user/model');
const mongoose = require('mongoose');

beforeEach(() => {
	return mongoose.connection.dropDatabase();
});

describe('Root Path', () => {
	test('It should be an Unauthorized request', async () => {
		const response = await request(app).get('/');
		expect(response.statusCode).toBe(401);
	});
})


describe('Return User', () => {
	test('It should return Hello World!', async () => {
		const user = new User({
				givenName: 'narp',
				email: 'narp@gmail.com',
		});
		user.save();
		const response = await request(app).get(`/user/${user.id}`);
	});
})

// mongoose.connect(process.env.MONGODB_TEST, function(err) {
//     mongoose.connection.db.dropDatabase();
// });