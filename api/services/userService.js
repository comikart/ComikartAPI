const knex = require('../../db/knex');
const { encryptPwd } = require('../utils/security');

const saveUser = (user) => encryptPwd(user).then((user) => knex('user').insert(user));

const findUserById = (id) => knex.select().from('user').where({id});

const findAllUsers = () => knex.select().from('user');

const findUserByEmail = (email) => knex.select().from('user').where({email});

module.exports = {
    saveUser,
    findUserById,
    findUserByEmail,
    findAllUsers
}