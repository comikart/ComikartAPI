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

describe('/api/paymentoption/:userid', () => {
  describe('/?(user_id = 1)', () => {
    it('Should return all payment options for user ID = 1', done => {
      const user_id = 1;
      const req = new Request();
      const res = new Response();
      req.params.id = user_id;

      controller.findAllPaymentOptionByUser(req, res).then(response => {
        expect(response.body.length).toBe(2);
        done();
      });
    });
  });

  describe('/?(user_id = 2)', () => {
    it('Should return all payment options for user ID = 2', done => {
      const user_id = 2;
      const req = new Request();
      const res = new Response();
      req.params.id = user_id;

      controller.findAllPaymentOptionByUser(req, res).then(response => {
        expect(response.body.length).toBe(1);
        done();
      });
    });
  });

  describe('/?(user_id = 3)', () => {
    it('Should return all payment options for user ID = 3', done => {
      const user_id = 3;
      const req = new Request();
      const res = new Response();
      req.params.id = user_id;

      controller.findAllPaymentOptionByUser(req, res).then(response => {
        expect(response.body.length).toBe(1);
        done();
      });
    });
  });

  describe('/?(user_id = 4)', () => {
    it('Should return error message', done => {
      const user_id = 4;
      const req = new Request();
      const res = new Response();
      req.params.id = user_id;

      controller.findAllPaymentOptionByUser(req, res).then(response => {
        expect(response.body).toBe('ID passed is invalid');
        done();
      });
    });
  });
});
