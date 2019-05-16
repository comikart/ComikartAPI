
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('review').del()
    .then(function () {
      // Inserts seed entries
      return knex('review').insert([
        {
          product_id: 1, 
          user_id: 1, 
          score: 4, 
          title: 'this is a title', 
          description: 'description'
        },
        {
          product_id: 1, 
          user_id: 2, 
          score: 1, 
          title: 'a second title', 
          description: 'description'
        },
        {
          product_id: 1, 
          user_id: 3, 
          score: 5, 
          title: 'a third title', 
          description: 'description'
        },
        {
          product_id: 2, 
          user_id: 2, 
          score: 5, 
          title: 'best product ever!!', 
          description: 'very good product.'
        },
      ]);
    });
};
