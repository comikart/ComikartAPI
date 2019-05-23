exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('payment_option')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('payment_option').insert([
        {
          credit_card: 424242424242,
          billing_address: '123 whambam st',
          exp: '05/20',
          security_number: 444,
          active: false,
          user_id: 1,
          type_id: 1,
        },
        {
          credit_card: 4242424242423,
          billing_address: '424 whambam st',
          exp: '05/20',
          security_number: 444,
          active: false,
          user_id: 2,
          type_id: 2,
        },
        {
          credit_card: 324242424242,
          billing_address: '324 whambam st',
          exp: '05/20',
          security_number: 444,
          active: false,
          user_id: 3,
          type_id: 2,
        },
      ]);
    });
};
