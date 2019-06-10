const mockDb = require('mock-knex');

const knex = require('../../db/knex');
const service = require('../../api/services/purchaseService');
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

describe('Test purchaseService', () => {
  describe('Test findPurchaseById', () => {
    it('Should return purchase by ID', done => {
      const purchase = {
        status_id: 1,
        address_one: '123 wambam st.',
        full_name: 'lorem ipsum',
        city: 'Las Vegas',
        state: 'NV',
        country: 'US',
        zip: '89027',
        phone: '+1 555 555 5555',
        email: 'lorem@email.com',
        user_id: 1,
        invoice_id: 1,
      };
      const id = 1;

      tracker.on('query', query => {
        expect(query.bindings.length).toBe(1);
        expect(query.method).toBe('select');
        query.response(purchase);
      });

      return service.findPurchaseById(id).then(res => {
        expect(res).toEqual(purchase);
        done();
      });
    });
  });
});
