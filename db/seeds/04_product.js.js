
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {
          title: 'lorem', 
          unit_price: 19.99, 
          author: 'lorem', 
          description: 'Hello, World!', 
          series: 1, 
          paperback: 299, 
          publisher: 'Acme Inc.', 
          isbn: 1234567890123, 
          weight: '12 ounces', 
          dimensions: '6 x 4 x 1', 
          product_code: 'xftz21y', 
          category_id: 1
        },
      ]);
    });
};
