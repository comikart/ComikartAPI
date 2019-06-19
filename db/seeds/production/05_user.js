const { encryptPwd } = require('../../../api/utils/encryption');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('user').insert([
        {
          first_name: 'Admin',
          last_name: '',
          email: 'admin@email.com',
          password: encryptPwd('password'),
          role_id: 1,
        },
      ]);
    });
};
