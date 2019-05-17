
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comment').del()
    .then(function () {
      // Inserts seed entries
      return knex('comment').insert([
        {
          user_id: 1, 
          review_id: 1, 
          description: 'Hey, Friend! \n thats a good tip!'
        },
        {
          user_id: 3, 
          review_id: 1,  
          description: 'well done on the review!'
        },
        {
          user_id: 2, 
          review_id: 1,  
          description: 'awesome, review!'
        },
      ]);
    });
};
