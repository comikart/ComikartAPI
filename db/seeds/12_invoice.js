exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('invoice')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('invoice').insert([
        {
          sub_total: 43.23,
          tax: 0.32,
          shipping: 5.0,
          total: 43.55,
          payment_id: 1
        },
        {
          sub_total: 53.23,
          tax: 1.32,
          shipping: 5.0,
          total: 44.55,
          payment_id: 2
        },
        {
          sub_total: 33.23,
          tax: 3.32,
          shipping: 5.0,
          total: 36.55,
          payment_id: 3
        }
      ]);
    });
};
