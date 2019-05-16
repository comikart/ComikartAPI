
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('category').del()
    .then(function () {
      // Inserts seed entries
      return knex('category').insert([
        {title: 'lorem'},
        {title: 'ipsum'},
        {title: 'dolor'},
        {title: 'sit'},
        {title: 'amet'}
      ]);
    });
};
