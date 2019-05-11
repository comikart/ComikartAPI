
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {first_name: 'lorem', last_name: 'ipsum', email: 'a@example.com', password: '123', role_id: 2},
        {first_name: 'dolor', last_name: 'sit', email: 'a@example.com', password: '123', role_id: 2},
        {first_name: 'amed', last_name: 'ipsum', email: 'a@example.com', password: '123', role_id: 2},
      ]);
    });
};
