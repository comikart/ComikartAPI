exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('coupon')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('coupon').insert([
        { code: 'Hello,World', discount: 14.5, is_percent: true },
        { code: 'MAY_2019', discount: 49.5, is_percent: false },
        { code: 'COMIKART_2019', discount: 49.5, is_percent: true }
      ]);
    });
};
