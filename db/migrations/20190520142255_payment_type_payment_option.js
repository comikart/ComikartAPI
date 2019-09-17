exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('payment_type', table => {
      table.increments('id');
      table.string('title').notNullable();
    })
    .createTable('payment_option', table => {
      table.increments('id');
      table.string('credit_card', 16);
      table.integer('security_number', 3);
      table.string('street', 100);
      table.string('state', 100);
      table.string('city', 100);
      table.string('full_name', 30);
      table.string('country', 2);
      table.string('postal_code', 5);
      table.string('exp_month', 2);
      table.string('exp_year', 4);
      table.boolean('active');``
      table
        .integer('user_id')
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table
        .integer('type_id')
        .references('id')
        .inTable('payment_type')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('payment_option').dropTable('payment_type');
};
