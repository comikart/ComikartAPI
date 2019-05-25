jest.mock('../services/userService.js');
const controller = require('./userController');

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

class User {
  constructor(
    first_name = 'John',
    last_name = 'Doe',
    email = 'john@email.com',
    password = 'password'
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
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

describe('/api/user', () => {
  describe('/login {POST}', () => {
    it('should return a user object', done => {
      // given
      req.body.token = '1321beyv1ve76t1qv276e1v2bdand9ah';
      req.body.email = 'john@email.com';

      //when
      controller.login(req, res).then(response => {
        //then
        expect(req.body.email).toBe(response.body.user.email);

        expect(req.body.token).toBe(response.body.token);

        done();
      });
    });
  });

  describe('/register {POST}', () => {
    it('should accept a user object, and return a saved user', done => {
      req.body.user = new User();

      controller.register(req, res).then(response => {
        expect(response.status).toBe(201);

        done();
      });
    });
  });

  describe('/user/{id}/cart', () => {
    it('should return a list of products in a users cart', done => {
      req.params.id = 1;

      controller.findCartByUserId(req, res).then(response => {
        expect(response.body.length).toBe(3);

        done();
      });
    });

    it('should return an empty list', done => {
      req.params.id = 2;

      controller.findCartByUserId(req, res).then(response => {
        expect(response.body.length).toBe(0);

        done();
      });
    });

    it('should return an error message', done => {
      controller.findCartByUserId(req, res).then(response => {
        expect(response.body).toBe('no id was passed');

        done();
      });
    });
  });

  describe('/user/{id}/cart/{product_id}', () => {
    it('should move a product item from cart to wish list', done => {
      req.params.id = 1;
      req.params.product_id = 3;

      controller.moveCartItemToWishList(req, res).then(response => {
        expect(response.body.length).toBe(2);

        done();
      });
    });

    it('should return an error', done => {
      controller.moveCartItemToWishList(req, res).then(response => {
        expect(response.body).toBe('incorrect user id or product id');

        done();
      });
    });
  });

  describe('/user/{id}/wishlist', () => {
    it('should return the list of wish list items for a user', done => {
      req.params.id = 1;
      controller.findWishListByUserId(req, res).then(response => {
        expect(response.body.length).toBe(3);

        done();
      });
    });

    it('should return an empty list', done => {
      req.params.id = 2;
      controller.findWishListByUserId(req, res).then(response => {
        expect(response.body.length).toBe(0);

        done();
      });
    });

    it('should return an error message', done => {
      controller.findWishListByUserId(req, res).then(response => {
        expect(response.body).toBe('missing param id is required');

        done();
      });
    });
  });

  describe('/user/{id}/wishlist/{product_id}', () => {
    it('should move one item from wish list to cart ', done => {
      req.params.id = 1;
      req.params.product_id = 3;

      controller.moveWishListItemToCart(req, res).then(response => {
        expect(response.body.length).toBe(2);

        done();
      });
    });

    it('should return an error message', done => {
      controller.moveWishListItemToCart(req, res).then(response => {
        expect(response.body).toBe('incorrect user id or product id');

        done();
      });
    });
  });
});
