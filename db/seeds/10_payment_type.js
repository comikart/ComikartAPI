exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('payment_type')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('payment_type').insert([
        { title: 'debit' },
        { title: 'credit' },
      ]);
    });
};
