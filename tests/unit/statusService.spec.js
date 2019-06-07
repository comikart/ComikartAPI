const mockDb = require('mock-knex');

const knex = require('../../db/knex');
const service = require('../../api/services/statusService');
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

describe('Test statusService', () => {
  describe('Test findAllStatus', () => {
    it('Should return all status', done => {
      const seed = [
        { title: 'open' },
        { title: 'shipping' },
        { title: 'closed' },
        { title: 'canceled' },
      ];

      tracker.on('query', query => {
        const regex = /select\s\*\sfrom\s"status"/;
        expect(regex.test(query.sql)).toBe(true);
        expect(query.method).toBe('select');
        query.response(seed);
      });

      return service.findAllStatus().then(res => {
        expect(res).toEqual(seed);
        done();
      });
    });
  });

  describe('Test findStatusById', () => {
    it('Should return an invoice by ID', done => {
      const status = { title: 'open' };

      tracker.on('query', query => {
        const regex = /select\s\*\sfrom\s"status"\swhere\s"id"\s\=\s\$1\slimit\s\$2/;
        expect(regex.test(query.sql)).toBe(true);
        expect(query.bindings.length).toBe(2);
        expect(query.bindings).toEqual([1, 1]);
        expect(query.method).toBe('first');
        query.response(status);
      });

      return service.findStatusById(1).then(res => {
        expect(res).toEqual(status);
        done();
      });
    });
  });

  describe('Test findStatusByTitle', () => {
    it('Should return an status by title', done => {
      const status = { title: 'open' };
      const title = 'open';

      tracker.on('query', query => {
        const regex = /select\s\*\sfrom\s"status"\swhere\s"title"\s\=\s\$1\slimit\s\$2/;
        expect(regex.test(query.sql)).toBe(true);
        expect(query.bindings.length).toBe(2);
        expect(query.bindings).toEqual(['open', 1]);
        expect(query.method).toBe('first');
        query.response(status);
      });

      return service.findStatusByTitle(title).then(res => {
        expect(res).toEqual(status);
        done();
      });
    });
  });
});
