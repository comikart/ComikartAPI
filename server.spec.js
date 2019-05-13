const server = require('./server');
const mockMvc = require('supertest')(server);

describe('Server', () => {
    it('should return a string on a successful response', (done) => {
        mockMvc
        .get('/')
        .expect(200)
        .expect('{"status":"connected"}', done);
    })
})