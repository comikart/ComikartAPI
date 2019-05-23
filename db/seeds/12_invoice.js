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
          total: 43.55,
          shipping_address: '123 bamwham st',
          payment_id: 1,
        },
        {
          sub_total: 53.23,
          tax: 1.32,
          total: 44.55,
          shipping_address: '234 bamwham st',
          payment_id: 2,
        },
        {
          sub_total: 33.23,
          tax: 3.32,
          total: 36.55,
          shipping_address: '345 bamwham st',
          payment_id: 3,
        },
      ]);
    });
};
