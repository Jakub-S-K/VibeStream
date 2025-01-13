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

