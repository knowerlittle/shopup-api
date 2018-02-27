const request = require('supertest');
const app = require('server/app')

describe('Root Path', () => {
	test('It should be an Unauthorized Request', async done => {
		const response = await request(app).get('/');
		await expect(response.statusCode).toBe(401);
		await done();
	});
});