
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('helpful').del()
    .then(function () {
      // Inserts seed entries
      return knex('helpful').insert([
        {review_id: 1, user_id: 2},
        {review_id: 1, user_id: 1},
        {review_id: 1, user_id: 3},
      ]);
    });
};
