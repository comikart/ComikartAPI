const mockDb = require('mock-knex');

const knex = require('../../db/knex');
const service = require('../../api/services/couponService');
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

describe('Test couponService', () => {
  describe('Test findAllCoupons', () => {
    it('Should return all coupons', done => {
      const seed = [
        { code: 'Hello,World', discount: 14.5, is_percent: true },
        { code: 'MAY_2019', discount: 49.5, is_percent: false },
        { code: 'COMIKART_2019', discount: 49.5, is_percent: true },
      ];

      tracker.on('query', query => {
        const regex = /select\s\*\sfrom\s"coupon"/;
        expect(regex.test(query.sql)).toBe(true);
        expect(query.method).toBe('select');
        query.response(seed);
      });

      return service.findAllCoupons().then(res => {
        expect(res).toEqual(seed);
        done();
      });
    });
  });

  describe('Test findCouponById', () => {
    it('Should return a coupon by ID', done => {
      const coupon = { code: 'MAY_2019', discount: 49.5, is_percent: false };

      tracker.on('query', query => {
        const regex = /select\s\*\sfrom\s"coupon"\swhere\s"id"\s\=\s\$1/;
        expect(regex.test(query.sql)).toBe(true);
        expect(query.method).toBe('select');
        expect(query.bindings).toEqual([2]);
        query.response(coupon);
      });

      return service.findCouponById(2).then(res => {
        expect(res).toBe(coupon);
        done();
      });
    });
    it('Should return a coupon by ID', done => {
      const coupon = { code: 'Hello,World', discount: 14.5, is_percent: true };

      tracker.on('query', query => {
        const regex = /select\s\*\sfrom\s"coupon"\swhere\s"id"\s\=\s\$1/;
        expect(regex.test(query.sql)).toBe(true);
        expect(query.method).toBe('select');
        expect(query.bindings).toEqual([1]);
        query.response(coupon);
      });

      return service.findCouponById(1).then(res => {
        expect(res).toBe(coupon);
        done();
      });
    });
  });

  describe('Test findCouponByCode', () => {
    it('Should return a coupon by its code', done => {
      const coupon = { code: 'MAY_2019', discount: 49.5, is_percent: false };
      const code = 'MAY_2019';

      tracker.on('query', query => {
        const regex = /select\s\*\sfrom\s"coupon"\swhere\s"code"\s\=\s\$1/;
        expect(regex.test(query.sql)).toBe(true);
        expect(query.method).toBe('select');
        expect(query.bindings[0]).toBe(code);
        query.response(coupon);
      });

      return service.findCouponByCode(code).then(res => {
        expect(res).toEqual(coupon);
        done();
      });
    });
  });

  describe('Test findCouponByProductId', () => {
    it('Should return coupons given a product ID', done => {
      const coupon = { code: 'MAY_2019', discount: 49.5, is_percent: false };
      const product_id = 1;

      tracker.on('query', query => {
        const regex = /select\s\*\sfrom\s"coupon"\swhere\s"product_id"\s\=\s\$1/;
        expect(regex.test(query.sql)).toBe(true);
        expect(query.method).toBe('select');
        expect(query.bindings[0]).toBe(1);
        query.response(coupon);
      });

      return service.findCouponByProductId(product_id).then(res => {
        expect(res).toEqual(coupon);
        done();
      });
    });
  });
});
