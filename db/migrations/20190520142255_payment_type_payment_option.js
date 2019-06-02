exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('payment_type', table => {
      table.increments('id');
      table.string('title').notNullable();
    })
    .createTable('payment_option', table => {
      table.increments('id');
      table.bigInteger('credit_card');
      table.string('address');
      table.string('full_name');
      table.string('country');
      table.string('postal_code');
      table.string('exp_month');
      table.string('exp_year');
      table.integer('security_number');
      table.boolean('active');
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
