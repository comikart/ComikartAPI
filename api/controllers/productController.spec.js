jest.mock('../services/productService.js');
const controller = require('../controllers/productController');

class Request {
  constructor(query = {}, params = {}, body = {}) {
    this.query = query;
    this.body = body;
    this.params = params;
  }
}

class Response {
  constructor(body = {}) {
    this.body = body;
  }
  status(code) {
    this.status = code;
    return this;
  }
  json(body) {
    this.body = body;
    return this;
  }
}

describe('/api/product', () => {
  describe('/?(category) {GET}', () => {
    it('should return a list of products', done => {
      controller
        .findAllProducts(new Request(), new Response())
        .then(response => {
          expect(response.body.length).toBe(10);

          done();
        });
    });
  });
  describe('/{id} {GET}', () => {
    it('should return a product by the id passed', done => {
      const id = 1;
      const req = new Request();
      const res = new Response();

      req.params.id = id;

      controller.findProductById(req, res).then(response => {
        expect(response.body.id).toBe(id);

        done();
      });
    });
  });
});
