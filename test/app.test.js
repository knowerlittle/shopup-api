const request = require('supertest');
const app = require('server/app')
const mongoose = require('mongoose');
const User = require(__root + 'components/user/model');
const createToken = require(__root + 'test/utils/createToken');

function dropDB(db = mongoose) {
	if (!mongoose.connection) {
		throw Error('Missing database connection');
	}
	return mongoose.connection.dropDatabase();
}

describe('Root Path', () => {
	test('It should be an Unauthorized request', async () => {
		const response = await request(app)
			.get('/');

		await dropDB();
		await expect(response.statusCode).toBe(401);
	});
})

describe('Return User', () => {
	test('It should return user', async () => {
		const user = new User({
				givenName: 'narp',
				email: 'narp@gmail.com',
		});
		user.save();

		const token = createToken(user);
		const response = await request(app)
			.get(`/user/${user.id}`)
			.set('Authorization', 'Bearer ' + token);
		
		await dropDB();
		await expect(JSON.parse(response.text)["_id"]).toBe(user.id);
	});
})

// mongoose.connect(process.env.MONGODB_TEST, function(err) {
//     mongoose.connection.db.dropDatabase();
// });