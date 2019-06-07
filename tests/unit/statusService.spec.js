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
});
