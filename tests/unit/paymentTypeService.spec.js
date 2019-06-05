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
    it('Should return a payment type by id', () => {
      const debit = { debit: 1 };
      tracker.on('query', query => {
        const regex = /from\s"payment_type"\swhere/;
        expect(regex.test(query.sql)).toEqual(true);
        expect(query.method).toEqual('select');
        query.response(debit);
      });
      return service.findPaymentTypeById(1).then(res => {
        expect(res).toEqual(debit);
      });
    });
  });
});
