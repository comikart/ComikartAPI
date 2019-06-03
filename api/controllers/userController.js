const router = require('express').router();

const { authenticate } = require('../utils/security'); 
const userService = require('../services/userService');
const { MOVETOWISHLIST, MOVETOCART } = userService;


/**
 * @api {post} /api/user/login Request Login
 * @apiVersion 1.0.0
 * @apiName POSTLogin
 * @apiGroup User
 *
 * @apiSuccess {object} User User profile information
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "first_name": "john",
 *       "last_name": "doe",
 *       "role_id": 2
 *     }
 *
 * @apiError IncorrectCredentials email or password is incorrect
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Client Error
 *     {
 *          "error"; "incorrect email or password"
 *     }
 */
router.route('/login')
  .post(authenticate, (res,res) => {
  const { token, email } = req.body;
  return userService
    .findUserByEmail(email)
    .then(user => token && res.json({ token, user }));
  });

/**
 * @api {post} /api/user/register Request Register
 * @apiVersion 1.0.0
 * @apiName POSTRegister
 * @apiGroup User
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 CREATED
 *     {}
 *
 * @apiError IncorrectCredentials Email already exists.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Client-Error
 *     {
 *          "error"; "email already exists"
 *     }
 */
router
  .route('/register')
  .post((req, res) => {
    const { user } = req.body;
    user.role_id = 2;
    return userService
      .saveUser(user)
      .then(() => res.status(201).json({}))
      .catch(err => res.status(400).json({ error: err.message }));
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    
    return userService
    .findUserById(id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
});

router
  .use('/:id/cart', authenticate)
  .get((req, res) => {
  const { id } = req.params;
  return userService
    .findCartAndProductByUserId(id)
    .then(cart => res.json(cart))
    .catch(err => res.status(400).json(err));
})

router
  .use('/:id/cart/:product_id', authenticate)
  .get((req, res) => {
  const { id } = req.params;
  const { product } = req.body;

  return userService
    .saveCartItem(id, product)
    .then(() => res.status(201).json())
    .catch(err => res.status(400).json(err));
});

router
  .use('/:id/wishlist', authenticate)
  .get((req, res) => {
  const { id } = req.params;
  return userService
    .findWishListAndProductByUserId(id)
    .then(cart => res.json(cart))
    .catch(err => res.status(400).json(err));
});

router
  .use('/:id/wishlist/:product_id', authenticate)
  .get((req, res) => {
  const { id } = req.params;
  const { product } = req.body;

  return userService
    .saveWishListItem(id, product)
    .then(() => res.status(201).json())
    .catch(err => res.status(400).json(err));
});

router
  .use('/:id/cart/:product_id', authenticate)
  .get((req, res) => {
  const { id, product_id } = req.params;
  return userService
    .moveItem(MOVETOCART, id, product_id)
    .then(list => res.json(list))
    .catch(err => res.status(400).json(err));
});

module.exports = router;