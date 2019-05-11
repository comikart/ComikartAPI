const server = require('./server');
const mockMvc = require('supertest')(server);

describe('Server', () => {
    it('should return connected', (done) => {
        mockMvc
        .get('/')
        .expect(200)
        .expect('{"status":"connected"}', done);
    })
})