const request = require('supertest');
const app = require('server/app')

describe('Test the root path', () => {
    test('It should be an Unauthorized request', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(401);
    });
})