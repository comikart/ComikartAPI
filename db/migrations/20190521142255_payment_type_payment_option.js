exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('payment_type', table => {
      table.increment('id');
      table.string('title').nonNullable();
    })
    .createTable('payment_option', table => {
      table.integer('credit_card');
      table.string('billing_address');
      table.date('exp');
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
  return knex.schema.dropTable('payment_type').dropTable('payment_option');
};
