const knex = require('../../db/knex');
const { encryptPwd } = require('../utils/encryption');

const saveUser = (user) => encryptPwd(user)
                            .then(res => knex('user').insert(res));

const findUserById = (id) => knex.select().from('user').where({id});

const findAllUsers = () => knex.select().from('user');

const findUserByEmail = (email) => knex('user').where({email}).first();

module.exports = {
    saveUser,
    findUserById,
    findUserByEmail,
    findAllUsers
}