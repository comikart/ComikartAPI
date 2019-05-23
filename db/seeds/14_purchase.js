exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('purchase')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('purchase').insert([
        { status_id: 1, user_id: 1, invoice_id: 1 },
        { status_id: 2, user_id: 2, invoice_id: 2 },
        { status_id: 3, user_id: 3, invoice_id: 3 },
      ]);
    });
};
