exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('purchase')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('purchase').insert([
        {
          status_id: 1,
          address_one: '123 wambam st.',
          full_name: 'lorem ipsum',
          city: 'Las Vegas',
          state: 'NV',
          country: 'US',
          zip: '89027',
          phone: '+1 555 555 5555',
          email: 'lorem@email.com',
          user_id: 1,
          invoice_id: 1
        },
        {
          status_id: 2,
          address_one: '123 wambam st.',
          full_name: 'lorem ipsum',
          city: 'Las Vegas',
          state: 'NV',
          country: 'US',
          zip: '89027',
          phone: '+1 555 555 5555',
          email: 'lorem@email.com',
          user_id: 2,
          invoice_id: 2
        },
        {
          status_id: 3,
          address_one: '123 wambam st.',
          full_name: 'lorem ipsum',
          city: 'Las Vegas',
          state: 'NV',
          country: 'US',
          zip: '89027',
          phone: '+1 555 555 5555',
          email: 'lorem@email.com',
          user_id: 3,
          invoice_id: 3
        }
      ]);
    });
};
