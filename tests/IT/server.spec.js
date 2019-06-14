jest.mock('../../api/services/userService.js');
jest.mock('../../api/services/blackListService.js');
jest.mock('../../api/services/paymentOptionService.js');
jest.mock('../../api/utils/security.js');
const server = require('../../server');
const mockMvc = require('supertest')(server);

describe('Server', () => {
  it('should return a string on a successful response', done => {
    mockMvc
      .get('/')
      .expect(200)
      .expect('{"status":"connected"}', done);
  });
});

describe('/api/user', () => {
  it('/login {POST} should return user data', done => {
    mockMvc
      .post('/api/user/login')
      .send({
        email: 'john@email.com',
        password: 'Hello',
      })
      .expect(200, done);
  });

  it('/register {POST} should return en empty json and 201 status', done => {
    mockMvc
      .post('/api/user/register')
      .send({
        user: {
          email: 'johndoe@email.com',
          password: 'Password1',
          passwordTwo: 'Password1',
        },
      })
      .expect(201, {}, done);
  });

  it('/:id {GET} should return a user by id', done => {
    mockMvc.get('/api/user/1').expect(200, done);
  });

  it("/:id/cart {GET} should return the client's cart", done => {
    mockMvc
      .get('/api/user/1/cart')
      .set('Accept', 'application/json')
      .expect(200)
      .then(res => {
        expect(res.body.length).toBe(3);
        done();
      });
  });

  it('/:id/cart {POST} should save a product to cart', done => {
    mockMvc
      .post('/api/user/1/cart')
      .send({ product: 1 })
      .expect(201, done);
  });

  it('/:id/cart/:product_id {GET} should move item from cart to wish list', done => {
    mockMvc.get('/api/user/1/cart/1').expect(200, done);
  });
});
