const mockDb = require('mock-knex');

const knex = require('../../db/knex');
const service = require('../../api/services/paymentTypeService');
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

describe('Testing the paymentTypeService', () => {
  describe('Test findAllPaymentType', () => {
    it('Should return all seed data', () => {
      const seed = {
        debit: 1,
        credit: 2,
      };
      tracker.on('query', query => {
        const regex = /select\s\*\sfrom\s"payment_type"/;
        expect(regex.test(query.sql)).toBe(true);
        expect(query.method).toEqual('select');
        query.response(seed);
      });

      return service
        .findAllPaymentType()
        .then(res => expect(res).toEqual(seed));
    });
  });
  describe('Test findPaymentTypeById', () => {
    it('Should return "debit" with an id of 1', () => {
      const debit = { debit: 1 };
      tracker.on('query', query => {
        const regex = /from\s"payment_type"\swhere\s"id"\s\=\s\$1/;
        expect(regex.test(query.sql)).toEqual(true);
        expect(query.method).toEqual('select');
        expect(query.bindings[0]).toEqual(1);
        query.response(debit);
      });
      return service.findPaymentTypeById(1).then(res => {
        expect(res).toEqual(debit);
      });
    });
    it('Should return "credit" with an id of 2', () => {
      const credit = { credit: 2 };
      tracker.on('query', query => {
        const regex = /from\s"payment_type"\swhere\s"id"\s\=\s\$1/;
        expect(regex.test(query.sql)).toEqual(true);
        expect(query.method).toEqual('select');
        expect(query.bindings[0]).toEqual(2);
        query.response(credit);
      });
      return service.findPaymentTypeById(2).then(res => {
        expect(res).toEqual(credit);
      });
    });
  });
});
