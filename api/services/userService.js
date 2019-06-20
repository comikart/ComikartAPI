const knex = require('../../db/knex');
const { encryptPwd } = require('../utils/encryption');
const productService = require('./productService');
const {
  findAllPaymentOptionByUser,
} = require('../services/paymentOptionService');
//enums
const MOVETOCART = 'MOVETOCART';
const MOVETOWISHLIST = 'MOVETOWISHLIST';

const saveUser = user => encryptPwd(user).then(res => knex('user').insert(res));

const findAllUsers = () => knex.select().from('user');

const findUserById = id =>
  knex
    .select()
    .from('user')
    .where({ id });

const findUserByEmail = email =>
  knex('user')
    .where({ email })
    .first();

const findCartByUserId = id =>
  knex('cart')
    .select()
    .where({ user_id: id });

const findCartAndProductByUserId = id =>
  findCartByUserId(id).then(cart =>
    Promise.all(
      cart.map(item =>
        productService
          .findProductById(item.product_id)
          .then(product => Object.assign({}, item, { product: product[0] })),
      ),
    ),
  );
const findUserAndCartAndPaymentOptionByEmail = email =>
  findUserByEmail(email).then(user => {
    return Promise.all([
      findCartAndProductByUserId(user.id),
      findAllPaymentOptionByUser(user.id),
    ]).then(arr =>
      Object.assign({}, user, { cart: arr[0], paymentOptions: arr[1] }),
    );
  });

const findCartSubTotalByUserId = user_id =>
  knex('cart')
    .select('cart.quantity', 'product.unit_price')
    .innerJoin('product', 'cart.product_id', 'product.id')
    .where({ user_id })
    .then(cart =>
      cart.reduce(
        (accu, curr) => accu + curr.quantity * parseFloat(curr.unit_price),
        0,
      ),
    );

const findCartItemByUserIdAndProductId = (user_id, product_id) =>
  knex('cart')
    .select()
    .where({ user_id, product_id })
    .first();

const saveCartItem = (user_id, product) => {
  const cartItem = Object.assign({}, product, { user_id });
  return knex('cart').insert(cartItem);
};

const updateCartItem = (user_id, product_id, quantity) => {
  return knex('cart')
    .where({ user_id, product_id })
    .update({ quantity })
    .then(() => findCartAndProductByUserId(user_id));
};

const deleteCartItemByUserIdAndProductId = (user_id, product_id) =>
  knex('cart')
    .where({ user_id, product_id })
    .del();

const deleteCartByUserId = user_id =>
  knex('cart')
    .where({ user_id })
    .del();

const findWishListByUserId = id =>
  knex('wish_list')
    .select()
    .where({ user_id: id });

const findWishListAndProductByUserId = id =>
  findWishListByUserId(id).then(list =>
    Promise.all(
      list.map(item =>
        productService
          .findProductById(item.product_id)
          .then(product => Object.assign({}, item, { product: product[0] })),
      ),
    ),
  );

const findWishListItemByUserIdAndProductId = (user_id, product_id) =>
  knex('wish_list')
    .select()
    .where({ user_id, product_id })
    .first();

const saveWishListItem = (user_id, product) => {
  const wishList = Object.assign({}, product, { user_id });
  return knex('wish_list').insert(wishList);
};

const deleteWishListItemByUserIdAndProductId = (user_id, product_id) =>
  knex('wish_list')
    .where({ user_id, product_id })
    .del();

const moveItem = (enumerator, user_id, product_id) => {
  if (enumerator === MOVETOWISHLIST) {
    return findCartItemByUserIdAndProductId(user_id, product_id)
      .then(cartItem => saveWishListItem(user_id, cartItem))
      .then(() => deleteCartItemByUserIdAndProductId(user_id, product_id))
      .then(() => findCartByUserId(user_id));
  } else if (enumerator === MOVETOCART) {
    return findWishListItemByUserIdAndProductId(user_id, product_id)
      .then(listItem => saveCartItem(user_id, listItem))
      .then(() => deleteWishListItemByUserIdAndProductId(user_id, product_id))
      .then(() => findWishListByUserId(user_id));
  } else {
    return {};
  }
};

module.exports = {
  MOVETOCART,
  MOVETOWISHLIST,
  saveUser,
  findUserById,
  findUserByEmail,
  findAllUsers,
  findUserAndCartAndPaymentOptionByEmail,
  findCartByUserId,
  findCartAndProductByUserId,
  findCartSubTotalByUserId,
  findCartItemByUserIdAndProductId,
  saveCartItem,
  updateCartItem,
  deleteCartItemByUserIdAndProductId,
  deleteCartByUserId,
  findWishListByUserId,
  findWishListAndProductByUserId,
  findWishListItemByUserIdAndProductId,
  saveWishListItem,
  deleteWishListItemByUserIdAndProductId,
  moveItem,
};
