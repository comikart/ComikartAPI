jest.mock('../services/productService.js');
const controller = require('../controllers/productController');
const Request = require('./helpers/Request');
const Response = require('./helpers/Response');

let req, res;

beforeEach(() => {
  req = new Request();
  res = new Response();
});

describe('/api/product', () => {
  describe('/?(category) {GET}', () => {
    it('should return a list of products', done => {
      controller.findAllProducts(req, res).then(response => {
        expect(response.body.length).toBe(10);

        done();
      });
    });
  });
  describe('/{id} {GET}', () => {
    it('should return a product by the id passed', done => {
      const id = 1;

      req.params.id = id;

      controller.findProductById(req, res).then(response => {
        expect(response.body.id).toBe(id);

        done();
      });
    });
  });
});
