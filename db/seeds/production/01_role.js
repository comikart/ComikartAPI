exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('role')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('role').insert([
        { description: 'admin' },
        { description: 'client' },
      ]);
    });
};
