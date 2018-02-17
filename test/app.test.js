const request = require('supertest');
const app = require('server/app')

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
        const response = await request(app).get('/user/5a8743b7c9cc7b685a34333e');
        console.log('r', response);
        // expect(response.text).toBe('Hello World!');
    });
})