const knex = require('../../db/knex');
const { encryptPwd } = require('../utils/encryption');

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

const findWishListItemByUserIdAndProductId = (user_id, product_id) =>
  knex('wish_list')
    .select()
    .where({ user_id, product_id })
    .first();

const saveWishListItem = wishItem => knex('wish_list').insert(wishItem);

module.exports = {
  saveUser,
  findUserById,
  findUserByEmail,
  findAllUsers,
  findCartByUserId,
  findCartItemByUserIdAndProductId,
  saveCartItem,
  deleteCartItemByUserIdAndProductId,
  findWishListByUserId,
  findWishListItemByUserIdAndProductId,
  saveWishListItem
};
