const mockDb = require('mock-knex');

const knex = require('../../db/knex');
const service = require('../../api/services/paymentOptionService');
const development = require('../../knexfile').development;

const tracker = mockDb.getTracker();
const db = knex(development);

beforeAll(() => {
  mockDb.mock(db);
});

beforeEach(() => {
  tracker.install();
});

afterEach(() => {
  tracker.uninstall();
});

afterAll(() => {
  mockDb.unmock(db);
});

describe('Testing the paymentOptionService', () => {
  describe('Test findAllPaymentOptionByUser', () => {
    it('Should return payment options for an id of 1', done => {
      const seed = [
        {
          id: 2,
          credit_card: 4242424242423,
          billing_address: '424 whambam st',
          exp: '05/20',
          security_number: 444,
          active: false,
          user_id: 2,
          type_id: 2,
        },
      ];

      tracker.on('query', query => {
        const regex = /[inner\sjoin\s\"payment_type"\son\s'\s\+\s'"payment_option"."type_id"]/;
        expect(regex.test(query.sql)).toBe(true);
        expect(query.bindings[0]).toBe(2);
        expect(query.method).toBe('select');
        query.response(seed);
      });

      return service.findAllPaymentOptionByUser(2).then(res => {
        expect(res).toEqual(seed);
        done();
      });
    });

    it('Should return payment options for an id of 2', done => {
      const seed = [
        {
          id: 2,
          credit_card: 4242424242423,
          billing_address: '424 whambam st',
          exp: '05/20',
          security_number: 444,
          active: false,
          user_id: 2,
          type_id: 2,
        },
      ];

      tracker.on('query', query => {
        const regex = /[inner\sjoin\s\"payment_type"\son\s'\s\+\s'"payment_option"."type_id"]/;
        expect(regex.test(query.sql)).toBe(true);
        expect(query.bindings[0]).toBe(2);
        expect(query.method).toBe('select');
        query.response(seed);
      });

      return service.findAllPaymentOptionByUser(2).then(res => {
        expect(res).toEqual(seed);
        done();
      });
    });
  });

  describe('Test findPaymentOptionById', () => {
    it('Should return payment option by an id', done => {
      const seed = {
        id: 1,
        credit_card: 424242424242,
        billing_address: '123 whambam st',
        exp: '05/20',
        security_number: 444,
        active: false,
        user_id: 1,
        type_id: 1,
      };

      tracker.on('query', query => {
        const regex = /['select\s\*\sfrom\s"payment_option"\swhere\s"id"\s=\s\$1']/;
        expect(regex.test(query.sql)).toBe(true);
        expect(query.bindings[0]).toBe(1);
        expect(query.method).toBe('select');
        query.response(seed);
      });

      return service.findPaymentOptionById(1).then(res => {
        expect(res).toEqual(seed);
        done();
      });
    });
  });
});
