exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('payment_option')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('payment_option').insert([
        {
          credit_card: 424242424242,
          security_number: 444,
          street: '123 whambam st',
          state: 'Nevada',
          city: 'Las Vegas',
          full_name: 'lorem ipsum',
          country: 'US', //iso2 country code
          postal_code: '55555',
          exp_month: '05',
          exp_year: '2020',
          active: false,
          user_id: 1,
          type_id: 1
        },
        {
          credit_card: 4242424242423,
          street: '424 whambam st',
          state: 'Nevada',
          city: 'Las Vegas',
          exp_month: '05',
          exp_year: '2020',
          postal_code: '55555',
          country: 'US',
          full_name: 'lorem ipsum',
          security_number: 444,
          active: false,
          user_id: 2,
          type_id: 2
        },
        {
          credit_card: 324242424242,
          street: '324 whambam st',
          state: 'Nevada',
          city: 'Las Vegas',
          exp_month: '05',
          exp_year: '2020',
          country: 'US',
          postal_code: '55555',
          full_name: 'lorem ipsum',
          security_number: 444,
          active: false,
          user_id: 3,
          type_id: 2
        }
      ]);
    });
};
