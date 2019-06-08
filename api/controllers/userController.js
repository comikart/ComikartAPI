const router = require('express').Router();
const { authenticate, authorization } = require('../utils/security');
const userService = require('../services/userService');
const { MOVETOWISHLIST, MOVETOCART } = userService;
const { validateForm } = require('../utils/validation');
const redis = require('../services/blackListService');
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
router.route('/login').post(authenticate, (req, res) => {
  const { token, email } = req.body;
  return userService
    .findUserByEmail(email)
    .then(user => token && res.json({ token, user }));
});

/**
 * @api {post} /api/user/logout Request Logout
 * @apiVersion 1.0.0
 * @apiName POSTLogout
 * @apiGroup User
 *
 * @apiSuccess {object} User User profile information
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Token stored"
 *     }
 *
 * @apiError IncorrectCredentials email or password is incorrect
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Client Error
 *     {
 *          "error"; "unable to logout"
 *     }
 */
router.route('/logout').get(authorization, (req, res) => {
  const token = req.get('Authorization');
  redis
    .blackList(token)
    .then(() => res.status(200).json({ message: 'Logged out' }))
    .catch(err => res.status(400).json({ err: err }));
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
router.route('/register').post(validateForm, (req, res) => {
  const { user } = req.body;
  user.role_id = 2;
  delete user.passwordTwo;
  return userService
    .saveUser(user)
    .then(() => res.status(201).json({}))
    .catch(err => res.status(400).json({ error: err.message }));
});

router.use('/:id', authorization);

router.route('/:id').get((req, res) => {
  const { id } = req.params;

  return userService
    .findUserById(id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
});

router
  .route('/:id/cart')
  .get((req, res) => {
    const { id } = req.params;
    return userService
      .findCartAndProductByUserId(id)
      .then(cart => res.json(cart))
      .catch(err => res.status(400).json(err));
  })
  .post((req, res) => {
    const { id } = req.params;
    const { product } = req.body;

    return userService
      .saveCartItem(id, product)
      .then(() => res.status(201).json())
      .catch(err => res.status(400).json(err));
  });

router.route('/:id/cart/:product_id').get((req, res) => {
  const { id, product_id } = req.params;
  return userService
    .moveItem(MOVETOWISHLIST, id, product_id)
    .then(list => res.json(list))
    .catch(err => res.status(400).json(err));
});

router
  .route('/:id/wishlist')
  .get((req, res) => {
    const { id } = req.params;
    return userService
      .findWishListAndProductByUserId(id)
      .then(cart => res.json(cart))
      .catch(err => res.status(400).json(err));
  })
  .post((req, res) => {
    const { id } = req.params;
    const { product } = req.body;

    return userService
      .saveWishListItem(id, product)
      .then(() => res.status(201).json())
      .catch(err => res.status(400).json(err));
  });

router.route('/:id/wishlist/:product_id').get((req, res) => {
  const { id, product_id } = req.params;
  return userService
    .moveItem(MOVETOCART, id, product_id)
    .then(list => res.json(list))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
