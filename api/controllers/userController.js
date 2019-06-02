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
const login = (req, res) => {
  const { token, email } = req.body;
  return userService
    .findUserByEmail(email)
    .then(user => token && res.json({ token, user }));
};

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
const register = (req, res) => {
  const { user } = req.body;
  user.role_id = 2;
  return userService
    .saveUser(user)
    .then(() => res.status(201).json({}))
    .catch(err => res.status(400).json({ error: err.message }));
};

const findUserById = (req, res) => {
  const { id } = req.params;

  return userService
    .findUserById(id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
};

const findCartByUserId = (req, res) => {
  const { id } = req.params;
  return userService
    .findCartAndProductByUserId(id)
    .then(cart => res.json(cart))
    .catch(err => res.status(400).json(err));
};

const saveProductToCart = (req, res) => {
  const { id } = req.params;
  const { product } = req.body;

  return userService
    .saveCartItem(id, product)
    .then(() => res.status(201).json())
    .catch(err => res.status(400).json(err));
};

const moveCartItemToWishList = (req, res) => {
  const { id, product_id } = req.params;
  return userService
    .moveItem(MOVETOWISHLIST, id, product_id)
    .then(cart => res.json(cart))
    .catch(err => res.status(400).json(err));
};

const findWishListByUserId = (req, res) => {
  const { id } = req.params;
  return userService
    .findWishListAndProductByUserId(id)
    .then(cart => res.json(cart))
    .catch(err => res.status(400).json(err));
};

const saveProductToWishList = (req, res) => {
  const { id } = req.params;
  const { product } = req.body;

  return userService
    .saveWishListItem(id, product)
    .then(() => res.status(201).json())
    .catch(err => res.status(400).json(err));
};

const moveWishListItemToCart = (req, res) => {
  const { id, product_id } = req.params;
  return userService
    .moveItem(MOVETOCART, id, product_id)
    .then(list => res.json(list))
    .catch(err => res.status(400).json(err));
};

module.exports = {
  login,
  register,
  findUserById,
  findCartByUserId,
  saveProductToCart,
  findWishListByUserId,
  saveProductToWishList,
  moveCartItemToWishList,
  moveWishListItemToCart
};
