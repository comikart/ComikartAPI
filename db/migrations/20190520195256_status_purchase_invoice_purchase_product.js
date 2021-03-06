exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('status', table => {
      table.increments('id');
      table.string('title').notNullable();
    })
    .createTable('invoice', table => {
      table.increments('id');
      table.decimal('sub_total');
      table.decimal('tax');
      table.decimal('shipping');
      table.decimal('total');
      table
        .integer('payment_id')
        .references('id')
        .inTable('payment_option')
        .onDelete('CASCADE');
    })
    .createTable('purchase', table => {
      table.increments('id');
      table.datetime('date_created').defaultTo(knex.fn.now());
      table.string('address_one', 100);
      table.string('address_two', 100);
      table.string('full_name', 20);
      table.string('city', 20);
      table.string('state', 2);
      table.string('zip', 5);
      table.string('country', 2);
      table.string('phone', 15);
      table.string('email', 50);
      table
        .integer('status_id')
        .references('id')
        .inTable('status')
        .onDelete('CASCADE')
        .defaultTo(1);
      table
        .integer('user_id')
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table
        .integer('invoice_id')
        .references('id')
        .inTable('invoice')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .alterTable('purchase', table => {
      table.unique(['user_id', 'invoice_id']);
    })
    .createTable('purchase_product', table => {
      table
        .integer('purchase_id')
        .references('id')
        .inTable('purchase')
        .onDelete('CASCADE');
      table
        .integer('product_id')
        .references('id')
        .inTable('product')
        .onDelete('CASCADE');
      table.integer('quantity');
    })
    .alterTable('purchase_product', table => {
      table.primary(['purchase_id', 'product_id']);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('purchase_product')
    .dropTable('purchase')
    .dropTable('invoice')
    .dropTable('status');
};
