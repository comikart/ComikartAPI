exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('coupon_product')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('coupon_product').insert([
        { coupon_id: 1, product_id: 1 },
        { coupon_id: 2, product_id: 2 },
        { coupon_id: 3, product_id: 3 }
      ]);
    });
};
