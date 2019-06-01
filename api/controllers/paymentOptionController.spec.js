jest.mock('../services/paymentOptionService.js');
const controller = require('../controllers/paymentOptionController');
const Request = require('../helpers/Request');
const Response = require('../helpers/Response');

describe('GET /user/:id/paymentoption', () => {
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

describe('GET /user/:id/paymentoption/:paymentoption_id', () => {
  describe('/?(id = 1)', () => {
    it('Should return the payment option with an ID of 1', done => {
      const id = 1;
      const req = new Request();
      const res = new Response();
      req.params.id = id;
      const obj = {
        id: 1,
        credit_card: 424242424242,
        billing_address: '123 whambam st',
        exp: '05/20',
        security_number: 444,
        active: false,
        user_id: 1,
        type_id: 1,
      };

      controller.findPaymentOptionById(req, res).then(response => {
        expect(response.body).toEqual(obj);
        done();
      });
    });
  });
  describe('/?(id = 2)', () => {
    it('Should return the payment option with an ID of 2', done => {
      const id = 2;
      const req = new Request();
      const res = new Response();
      req.params.id = id;
      const obj = {
        id: 2,
        credit_card: 4242424242423,
        billing_address: '424 whambam st',
        exp: '05/20',
        security_number: 444,
        active: false,
        user_id: 2,
        type_id: 2,
      };

      controller.findPaymentOptionById(req, res).then(response => {
        expect(response.body).toEqual(obj);
        done();
      });
    });
  });
  describe('/?(id = 3)', () => {
    it('Should return the payment option with an ID of 3', done => {
      const id = 3;
      const req = new Request();
      const res = new Response();
      req.params.id = id;
      const obj = {
        id: 3,
        credit_card: 324242424242,
        billing_address: '324 whambam st',
        exp: '05/20',
        security_number: 444,
        active: false,
        user_id: 3,
        type_id: 2,
      };

      controller.findPaymentOptionById(req, res).then(response => {
        expect(response.body).toEqual(obj);
        done();
      });
    });
  });
  describe('/?(id = 4)', () => {
    it('Should return the payment option with an ID of 4', done => {
      const id = 4;
      const req = new Request();
      const res = new Response();
      req.params.id = id;
      const obj = {
        id: 4,
        credit_card: 324242424242,
        billing_address: '324 whambam st',
        exp: '05/20',
        security_number: 444,
        active: false,
        user_id: 1,
        type_id: 2,
      };

      controller.findPaymentOptionById(req, res).then(response => {
        expect(response.body).toEqual(obj);
        done();
      });
    });
  });
});

describe('POST /user/:id/paymentoption', () => {
  describe('Save an object', () => {
    it('Should return a length of 2', done => {
      const req = new Request();
      const res = new Response();

      req.body.paymentOption = {
        credit_card: 324242424242,
        billing_address: '324 whambam st',
        exp: '05/20',
        security_number: 444,
        active: false,
        type_id: 1,
      };
      req.params.id = 2;

      controller.savePaymentOption(req, res).then(response => {
        expect(response.body.length).toBe(2);
        expect(response.status).toBe(201);
        done();
      });
    });
  });

  describe('Type ID of 3', () => {
    it('Should return error message', done => {
      const req = new Request();
      const res = new Response();

      req.body.paymentOption = {
        credit_card: 324242424242,
        billing_address: '324 whambam st',
        exp: '05/20',
        security_number: 444,
        active: false,
        type_id: 3,
      };
      req.params.id = 3;

      controller.savePaymentOption(req, res).then(response => {
        expect(response.body).toEqual('No payment option found');
        done();
      });
    });
  });
  describe('No object', () => {
    it('Should return error message', done => {
      const req = new Request();
      const res = new Response();

      req.params.id = 3;

      controller.savePaymentOption(req, res).then(response => {
        expect(response.body).toEqual('No payment option found');
        done();
      });
    });
  });
});

describe('PUT /user/:id/paymentoption/:paymentoption_id', () => {
  const obj = {
    id: 1,
    credit_card: 324242424242,
    billing_address: '123 whambam st',
    exp: '05/20',
    security_number: 444,
    active: false,
    type_id: 1,
    user_id: 1,
  };
  describe('Update a payment option by id', () => {
    it('Should return the updated payment options', done => {
      const req = new Request();
      const res = new Response();

      req.body.paymentOption = obj;
      req.params.id = 1;
      req.params.paymentoption_id = 1;

      controller.updatePaymentOption(req, res).then(response => {
        expect(response.body[0]).toEqual(obj);
        expect(response.status).toBe(200);
        done();
      });
    });
  });

  describe('Invalid ID sent', () => {
    it('Return error "Invalid ID"', done => {
      const req = new Request();
      const res = new Response();

      req.body.paymentOption = obj;
      req.params.id = 1;
      req.params.paymentoption_id = 8;

      controller.updatePaymentOption(req, res).then(response => {
        expect(response.body).toEqual('Invalid ID');
        done();
      });
    });
  });
  describe('No payment object sent', () => {
    it('Return error "No payment option found"', done => {
      const req = new Request();
      const res = new Response();

      req.params.id = 1;
      req.params.paymentoption_id = 8;

      controller.updatePaymentOption(req, res).then(response => {
        expect(response.body).toEqual('No payment option found');
        done();
      });
    });
  });
});

describe('DELETE /user/:id/paymentoption', () => {
  describe('Delete a payment option by passing in payment option', () => {
    it('Should return an updated list without the payment option', done => {
      const obj = {
        id: 1,
        credit_card: 324242424242,
        billing_address: '123 whambam st',
        exp: '05/20',
        security_number: 444,
        active: false,
        type_id: 1,
        user_id: 1,
      };
      const req = new Request();
      const res = new Response();

      req.body.paymentOption = obj;
      req.params.id = 1;

      controller.deletePaymentOption(req, res).then(response => {
        expect(response.body.length).toBe(1);
        expect(response.status).toBe(200);
        done();
      });
    });
  });
  describe('No paymentOption sent in', () => {
    it('Return error "No payment option found"', done => {
      const req = new Request();
      const res = new Response();

      req.params.id = 1;

      controller.deletePaymentOption(req, res).then(response => {
        expect(response.body).toBe('No payment option found');
        expect(response.status).toBe(400);
        done();
      });
    });
  });
});

describe('DELETE /user/:id/paymentoption/paymentoption_id', () => {
  describe('Delete a payment option by id', () => {
    it('Should return updated list without payment option with id', done => {
      const req = new Request();
      const res = new Response();

      req.params.paymentoption_id = 2;
      req.params.id = 2;

      controller.deletePaymentOptionById(req, res).then(response => {
        expect(response.body.length).toBe(1);
        expect(response.status).toBe(200);
        done();
      });
    });
  });
  describe('No ID is passed in', () => {
    it('Should return error "Invalid ID', done => {
      const req = new Request();
      const res = new Response();

      req.params.id = 2;

      controller.deletePaymentOptionById(req, res).then(response => {
        expect(response.body).toBe('Invalid ID');
        expect(response.status).toBe(400);
        done();
      });
    });
  });
  describe('Invalid ID is passed in', () => {
    it('Should return error "No payment option found', done => {
      const req = new Request();
      const res = new Response();

      req.params.id = 2;
      req.params.paymentoption_id = 19;

      controller.deletePaymentOptionById(req, res).then(response => {
        expect(response.body).toBe('No payment option found');
        expect(response.status).toBe(400);
        done();
      });
    });
  });
});
