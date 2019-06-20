const router = require('express').Router();
const { authenticate, authorization } = require('../utils/security');
const userService = require('../services/userService');
const { MOVETOWISHLIST, MOVETOCART } = userService;
const { validateForm } = require('../utils/validation');
const redis = require('../services/blackListService');

router.route('/login').post(authenticate, (req, res) => {
  const { token, email } = req.body;
  return userService
    .findUserAndCartAndPaymentOptionByEmail(email)
    .then(user => {
      token && res.json({ token, user });
    });
});

router.route('/logout').get(authorization, (req, res) => {
  const token = req.get('Authorization');
  redis
    .blackList(token)
    .then(() => res.status(200).json({ message: 'Logged out' }))
    .catch(err => res.status(400).json({ err: err }));
});

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

router
  .route('/:id/cart/:product_id')
  .get((req, res) => {
    const { id, product_id } = req.params;
    return userService
      .moveItem(MOVETOWISHLIST, id, product_id)
      .then(list => res.json(list))
      .catch(err => res.status(400).json(err));
  })
  .put((req, res) => {
    const { id, product_id } = req.params;
    const { quantity } = req.body;
    return userService
      .updateCartItem(id, product_id, quantity)
      .then(cart => res.json(cart));
  })
  .delete((req, res) => {
    const { id, product_id } = req.params;
    return userService
      .deleteCartItemByUserIdAndProductId(id, product_id)
      .then(() => res.status(204).json({}));
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

router
  .route('/:id/wishlist/:product_id')
  .get((req, res) => {
    const { id, product_id } = req.params;
    return userService
      .moveItem(MOVETOCART, id, product_id)
      .then(list => res.json(list))
      .catch(err => res.status(400).json(err));
  })
  .put((req, res) => {
    const { id, product_id } = req.params;
    const { quantity } = req.body;
    userService
      .updateWishListItem(is, product_id, quantity)
      .then(() =>
        userService.findWishListItemByUserIdAndProductId(id, product_id),
      )
      .then(item => res.json(item));
  })
  .delete((req, res) => {
    const { id, product_id } = req.params;
    userService
      .deleteWishListItemByUserIdAndProductId(id, product_id)
      .then(() => userService.findWishListByUserId(id))
      .then(list => res.status(204).json(list));
  });

module.exports = router;
