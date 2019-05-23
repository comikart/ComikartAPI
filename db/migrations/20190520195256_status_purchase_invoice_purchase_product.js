exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('status', table => {
      table.increments('id');
      table.string('title').notNullable();
    })
    .createTable('purchase', table => {
      table.increments('id');
      table.datetime('date_created').defaultTo(knex.fn.now());
      table
        .integer('status_id')
        .references('id')
        .inTable('status')
        .onDelete('CASCADE');
      table
        .integer('user_id')
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
    })
    .createTable('invoice', table => {
      table.increments('id');
      table.datetime('date_created').defaultTo(knex.fn.now());
      table.decimal('sub_total');
      table.decimal('tax');
      table.decimal('total');
      table.string('shipping_address');
      table
        .integer('payment_id')
        .references('id')
        .inTable('payment')
        .onDelete('CASCADE');
      table
        .integer('purchase_id')
        .references('id')
        .inTable('purchase')
        .onDelete('CASCADE');
    })
    .alterTable('invoice', table => {
      table.unique(['payment_id', 'purchase_id']);
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
    .dropTable('status')
    .dropTable('invoice');
};
