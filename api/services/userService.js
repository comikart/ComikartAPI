const knex = require('../../db/knex');
const { encryptPwd } = require('../utils/encryption');
const productService = require('./productService');

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
  findCartByUserId(id)
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
      return {
        subTotal: items.reduce(
          (sum, curr) =>
            sum + curr.quantity * parseFloat(curr.product.unit_price),
          0
        ),
        cartItems: items
      };
    });

const findCartItemByUserIdAndProductId = (user_id, product_id) =>
  knex('cart')
    .select()
    .where({ user_id, product_id })
    .first();

const saveCartItem = cartItem => knex('cart').insert(cartItem);

const deleteCartItemByUserIdAndProductId = (user_id, product_id) =>
  knex('cart')
    .where({ user_id, product_id })
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
          .then(product => Object.assign({}, item, { product: product[0] }))
      )
    )
  );

const findWishListItemByUserIdAndProductId = (user_id, product_id) =>
  knex('wish_list')
    .select()
    .where({ user_id, product_id })
    .first();

const saveWishListItem = wishItem => knex('wish_list').insert(wishItem);

const deleteWishListItemByUserIdAndProductId = (user_id, product_id) =>
  knex('wish_list')
    .where({ user_id, product_id })
    .del();

const moveItem = (enumerator, user_id, product_id) => {
  if (enumerator === MOVETOWISHLIST) {
    return findCartItemByUserIdAndProductId(user_id, product_id)
      .then(cartItem => saveWishListItem(cartItem))
      .then(() => deleteCartItemByUserIdAndProductId(user_id, product_id))
      .then(() => findCartByUserId(user_id));
  } else if (enumerator === MOVETOCART) {
    return findWishListItemByUserIdAndProductId(user_id, product_id)
      .then(listItem => saveCartItem(listItem))
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
  findCartByUserId,
  findCartAndProductByUserId,
  findCartItemByUserIdAndProductId,
  saveCartItem,
  deleteCartItemByUserIdAndProductId,
  findWishListByUserId,
  findWishListAndProductByUserId,
  findWishListItemByUserIdAndProductId,
  saveWishListItem,
  deleteWishListItemByUserIdAndProductId,
  moveItem
};
