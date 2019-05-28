jest.mock('../services/reviewService.js');
const controller = require('../controllers/reviewController');

class Response {
  constructor(body = {}) {
    this.body = body;
  }
  json(body) {
    this.body = body;
    return this;
  }

  status(code) {
    this.status = code;
    return this;
  }
}

class Request {
  constructor(header = {}, body = {}, params = {}) {
    this.header = header;
    this.body = body;
    this.params = params;
  }
}

let req;
let res;

beforeEach(() => {
  req = new Request();
  res = new Response();
});

describe('/api/review', () => {
  describe('', () => {
    it('should return all reviews in the database', done => {
      controller.findAllReviews(req, res).then(response => {
        expect(response.body.length).toBe(4);

        done();
      });
    });
  });

  describe('/{product_id}', () => {
    it('should return a collection of reviews that belong to a product', done => {
      req.params.product_id = 1;
      controller.findReviewByProductId(req, res).then(response => {
        expect(response.body.length).toBe(4);

        done();
      });
    });

    it('should return an empty collection of reviews', done => {
      req.params.product_id = 2;

      controller.findReviewByProductId(req, res).then(response => {
        expect(response.body.length).toBe(0);

        done();
      });
    });

    it('should return an error an message', done => {
      controller.findReviewByProductId(req, res).then(response => {
        expect(response.body).toBe('required param id is missing');

        done();
      });
    });
  });

  describe('/{review_id}', () => {
    it('should find and return a review by id', done => {
      const id = 1;
      req.params.review_id = id;
      controller.findReviewById(req, res).then(response => {
        expect(response.body.id).toBe(id);

        done();
      });
    });

    it('should return an error message', done => {
      controller.findReviewById(req, res).then(response => {
        expect(response.body).toBe('required param id is missing');

        done();
      });
    });
  });
});
