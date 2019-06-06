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

afterEach(() => {
  mockDb.unmock(db);
});

describe('Testing the paymentOptionService', () => {
  describe('Test findAllPaymentOptionByUser', () => {
    it('Should return payment options', done => {
      const seed = [
        {
          id: 1,
          credit_card: 424242424242,
          billing_address: '123 whambam st',
          exp: '05/20',
          security_number: 444,
          active: false,
          user_id: 1,
          type_id: 1,
        },
        {
          id: 4,
          credit_card: 324242424242,
          billing_address: '324 whambam st',
          exp: '05/20',
          security_number: 444,
          active: false,
          user_id: 1,
          type_id: 2,
        },
      ];

      tracker.on('query', query => {
        const regex = /[inner\sjoin\s\"payment_type"\son\s'\s\+\s'"payment_option"."type_id"]/;
        expect(regex.test(query.sql)).toBe(true);
        expect(query.bindings[0]).toBe(1);
        expect(query.method).toBe('select');
        query.response(seed);
      });

      return service.findAllPaymentOptionByUser(1).then(res => {
        expect(res).toEqual(seed);
        done();
      });
    });
  });
});
