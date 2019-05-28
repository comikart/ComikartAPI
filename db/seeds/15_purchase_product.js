exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('purchase_product')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('purchase_product').insert([
        { purchase_id: 1, product_id: 2, quantity: 1 },
        { purchase_id: 1, product_id: 1, quantity: 3 },
        { purchase_id: 1, product_id: 5, quantity: 2 },
        { purchase_id: 1, product_id: 3, quantity: 3 },
        { purchase_id: 2, product_id: 1, quantity: 2 },
        { purchase_id: 2, product_id: 5, quantity: 5 },
        { purchase_id: 3, product_id: 2, quantity: 8 },
        { purchase_id: 3, product_id: 4, quantity: 2 },
        { purchase_id: 3, product_id: 5, quantity: 3 }
      ]);
    });
};
