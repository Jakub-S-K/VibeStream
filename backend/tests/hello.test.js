const { expect } = require('chai');
const request = require('supertest');
const app = require('../index.js');

describe('Test /test/* routes', () => {
    describe('Hello world on /hello', () => {
        it('Hello world should be printed', async () => {
            const res = await request(app)
                .get('/test/hello')
                .send()
            expect(res.statusCode).to.equal(200)
            expect(res.text).to.include('Vibestream API test')
        });
    });
    describe('Get albums with mockup data', function () {
        it('should return mockcup albumsdata ', async function () {
            const res = await request(app)
                .get('/test/albums')
                .send()
            expect(res.statusCode).to.equal(200)
            const substrings = ['albumName', 'albumImage', 'username'];

            substrings.forEach(substring => {
                expect(res.text).to.include(substring);
            });
        });
    });
});

describe('Db tests', () => {
    describe('Get tags from db', function () {
        it('should return tags', async function () {
            const res = await request(app)
                .get('/api/tags')
                .send()
            expect(res.statusCode).to.equal(200)
            const substrings = ['id', 'name'];

            substrings.forEach(substring => {
                expect(res.text).to.include(substring);
            });
        });
    });

    describe('Get genres from db', function () {
        it('should return genres', async function () {
            const res = await request(app)
                .get('/api/genres')
                .send()
            expect(res.statusCode).to.equal(200)
            const substrings = ['id', 'name'];

            substrings.forEach(substring => {
                expect(res.text).to.include(substring);
            });
        });
    });

    describe('Post register', function () {
        it('should return user', async function () {
            const res = await request(app)
                .post('/api/register')
                .send({
                    nickname: 'juanpablo2', password: 'pass123',
                    email: '2137@watykan.czyk'
                })
                .set('Accept', 'application/json')
                .expect(201)
            const substrings = ['id', 'nickname'];

            substrings.forEach(substring => {
                expect(res.text).to.include(substring);
            });
        });
    });

    describe('Post login', function () {
        it('should return user', async function () {
            const res = await request(app)
                .post('/api/login')
                .send({ nickname: 'juanpablo2', password: 'pass123' })
                .set('Accept', 'application/json')
                .expect(200)
            const substrings = ['id', 'nickname'];

            substrings.forEach(substring => {
                expect(res.text).to.include(substring);
            });
        });
    });
});
