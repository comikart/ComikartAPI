const userService = require('../services/userService');
const productService = require('../services/productService');

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
  userService
    .findCartByUserId(id)
    .then(cart =>
      Promise.all(
        cart.map(item =>
          productService
            .findProductById(item.product_id)
            .then(product => Object.assign({}, item, { product: product[0] }))
        )
      )
    )
    .then(items => {
      const cart = {
        cartItems: items,
        subTotal: items.reduce(
          (sum, curr) =>
            sum + curr.quantity * parseFloat(curr.product.unit_price),
          0
        )
      };
      res.json(cart);
    })
    .catch(err => res.status(400).json(err));
};

const moveCartItemToWishList = (req, res) => {
  const { id, product_id } = req.params;
  userService
    .findCartItemByUserIdAndProductId(id, product_id)
    .then(cartItem => userService.saveWishListItem(cartItem))
    .then(() => userService.deleteCartItemByUserIdAndProductId(id, product_id))
    .then(() => userService.findCartByUserId(id))
    .then(cart => res.json(cart))
    .catch(err => res.status(400).json(err));
};

const findWishListByUserId = (req, res) => {
  const { id } = req.params;
  return userService
    .findWishListByUserId(id)
    .then(list =>
      Promise.all(
        list.map(item =>
          productService
            .findProductById(item.product_id)
            .then(product => Object.assign({}, item, { product: product[0] }))
        )
      )
    )
    .then(cart => res.json(cart))
    .catch(err => res.status(400).json(err));
};

module.exports = {
  login,
  register,
  findUserById,
  findCartByUserId,
  findWishListByUserId,
  moveCartItemToWishList
};
