exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("wish_list")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("wish_list").insert([
        { user_id: 3, product_id: 1, quantity: 1 },
        { user_id: 3, product_id: 2, quantity: 2 },
        { user_id: 3, product_id: 3, quantity: 3 }
      ]);
    });
};
