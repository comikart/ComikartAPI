const mockDb = require('mock-knex');

const knex = require('../../db/knex');
const service = require('../../api/services/invoiceService');
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

describe('Test invoiceService', () => {
  describe('Test findAllInvoices', () => {
    it('Should return all invoices', done => {
      const seed = [
        {
          sub_total: 43.23,
          tax: 0.32,
          shipping: 5.0,
          total: 43.55,
          payment_id: 1,
        },
        {
          sub_total: 53.23,
          tax: 1.32,
          shipping: 5.0,
          total: 44.55,
          payment_id: 2,
        },
        {
          sub_total: 33.23,
          tax: 3.32,
          shipping: 5.0,
          total: 36.55,
          payment_id: 3,
        },
      ];

      tracker.on('query', query => {
        const regex = /select\s\*\sfrom\s"invoice"/;
        expect(regex.test(query.sql)).toBe(true);
        expect(query.method).toBe('select');
        query.response(seed);
      });

      return service.findAllInvoices().then(res => {
        expect(res).toEqual(seed);
        done();
      });
    });
  });

  describe('Test findInvoiceById', () => {
    it('Should return an invoice by id', done => {
      const seed = {
        sub_total: 43.23,
        tax: 0.32,
        shipping: 5.0,
        total: 43.55,
        payment_id: 1,
      };

      tracker.on('query', query => {
        const regex = /["invoice"\swhere\s"id"\s\$1\slimit\s$2]/;
        expect(regex.test(query.sql)).toBe(true);
        expect(query.method).toBe('first');
        expect(query.bindings.length).toBe(2);
        expect(query.bindings).toEqual([1, 1]);
        query.response(seed);
      });

      return service.findInvoiceById(1).then(res => {
        expect(res).toEqual(seed);
        done();
      });
    });
  });

  describe('Test saveInvoice', () => {
    it('Should return the saved invoice', done => {
      const invoice = {
        sub_total: 43.23,
        tax: 0.32,
        shipping: 5.0,
        total: 43.55,
        payment_id: 1,
      };

      tracker.on('query', query => {
        const regex = /[(\$1,\s\$2,\s\$3,\s\$4\s\$5)]/;
        expect(regex.test(query.sql)).toBe(true);
        expect(query.bindings.length).toBe(5);
        expect(query.method).toBe('insert');
        query.response(invoice);
      });

      service.saveInvoice(invoice).then(res => {
        expect(res).toEqual(invoice);
        done();
      });
    });
  });
});
