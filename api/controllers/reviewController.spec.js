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

  describe('/', () => {
    it('should save and return the review', done => {
      req.body.review = {
        user_id: 1,
        score: 4,
        title: 'Hello',
        description: 'World!'
      };
      req.params.product_id = 1;

      controller.saveReview(req, res).then(response => {
        expect(response.body.length).toBe(5);

        done();
      });
    });

    it('should return an error message', done => {
      req.params.product_id = 1;

      const response = controller.saveReview(req, res);
      expect(response.body.message).toBe('review object is missing');

      done();
    });
  });

  describe('/{review_id}', () => {
    it('should delete the review by id', done => {
      req.params.review_id = 1;
      controller.deleteReview(req, res).then(response => {
        expect(response.body).toBeTruthy();

        done();
      });
    });
  });

  describe('/{review_id}/comment', () => {
    it('should save a comment and return the updated collection of comments', done => {
      req.body.comment = { user_id: 1, description: 'this is a comment' };
      req.params.review_id = 1;

      controller.saveComment(req, res).then(response => {
        expect(response.body.length).toBe(4);
        expect(response.status).toBe(201);

        done();
      });
    });
  });

  describe('/{review_id}/comment/{comment_id}', () => {
    it('should delete a comment', done => {
      req.params.comment_id = 1;
      req.params.review_id = 1;

      controller.deleteComment(req, res).then(response => {
        expect(response.body).toBeTruthy();
        expect(response.status).toBe(204);
        done();
      });
    });
  });

  describe('/{review_id}/helpful', () => {
    it('should save and return an updated review with its helpful count', done => {
      req.body.helpful = { user_id: 1 };
      req.params.review_id = 1;
      controller.saveHelpful(req, res).then(response => {
        expect(response.status).toBe(201);

        done();
      });
    });
  });
});
