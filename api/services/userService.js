const knex = require("../../db/knex");
const { encryptPwd } = require("../utils/encryption");

const saveUser = user => encryptPwd(user).then(res => knex("user").insert(res));

const findAllUsers = () => knex.select().from("user");

const findUserById = id =>
  knex
    .select()
    .from("user")
    .where({ id });

const findUserByEmail = email =>
  knex("user")
    .where({ email })
    .first();

const findCartByUserId = id =>
  knex("cart")
    .select()
    .where({ user_id: id });

const findWishListByUserId = id =>
  knex("wish_list")
    .select()
    .where({ user_id: id });

module.exports = {
  saveUser,
  findUserById,
  findUserByEmail,
  findAllUsers,
  findCartByUserId,
  findWishListByUserId
};
