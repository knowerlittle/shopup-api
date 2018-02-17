const request = require('supertest');
const app = require('server/app')
const User = require(__root + 'components/user/model');
const mongoose = require('mongoose');

beforeEach(() => {
	return mongoose.connection.dropDatabase();
});

describe('Test the root path', () => {
	test('It should be an Unauthorized request', async () => {
		const response = await request(app).get('/');
		expect(response.statusCode).toBe(401);
	});
})

describe('Hello Path', () => {
	test('It should return Hello World!', async () => {
		const response = await request(app).get('/hello');
		console.log('r', response.text);
		expect(response.text).toBe('Hello World!');
	});
})

describe('Return User', () => {
	test('It should return Hello World!', async () => {
		const user = new User({
				givenName: 'narp',
				email: 'narp@gmail.com',
		});
		user.save();
		console.log('a', user.id);
		const response = await request(app).get(`/user/${user.id}`);
		console.log('rrr', response.body);
	});
})

// mongoose.connect(process.env.MONGODB_TEST, function(err) {
//     mongoose.connection.db.dropDatabase();
// });