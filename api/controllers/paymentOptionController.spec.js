jest.mock('../services/paymentOptionService.js');
const controller = require('../controllers/paymentOptionController');

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

describe('/api/paymentoption/:id', () => {
  describe('/?(id = 1)', () => {
    it('Should return all payment options for user ID = 1', done => {
      const id = 1;
      const req = new Request();
      const res = new Response();
      req.params.id = id;

      controller.findAllPaymentOptionByUser(req, res).then(response => {
        expect(response.body.length).toBe(2);
        done();
      });
    });
  });
});
