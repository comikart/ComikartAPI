const bcrypt = require('bcrypt');
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user')
    .del()
    .then(function() {
      const encrypted = bcrypt.hashSync('password', SALT_ROUNDS);

      // Inserts seed entries
      return knex('user').insert([
        {
          first_name: 'lorem',
          last_name: 'ipsum',
          email: 'lorem@example.com',
          password: '123',
          role_id: 2,
        },
        {
          first_name: 'dolor',
          last_name: 'sit',
          email: 'dolor@example.com',
          password: '123',
          role_id: 2,
        },
        {
          first_name: 'Admin',
          last_name: '',
          email: 'admin@email.com',
          password: encrypted,
          role_id: 1,
        },
      ]);
    });
};
