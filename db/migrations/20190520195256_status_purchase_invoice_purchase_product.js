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
      table.timestamp('date_created');
      table.decimal('total');
      table.string('shipping_address');
      // table
      //   .integer('payment_id')
      //   .references('id')
      //   .inTable('payment_id')
      //   .onDelete('CASCADE');
    })
    // .alterTable('invoice', table => {
    //   table.unique(['purchase_id', 'payment_id']);
    // })
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
      table
        .integer('invoice_id')
        .references('id')
        .inTable('invoice')
        .onDelete('CASCADE');
    })
    .alterTable('purchase', table => {
      table.unique(['user_id', 'invoice_id']);
    })

    .createTable('purchase_product', table => {
      table
        .increments('purchase_id')
        .references('id')
        .inTable('purchase')
        .onDelete('CASCADE');
      table
        .increments('product_id')
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
    .dropTable('invoice')
    .dropTable('purchase_product')
    .dropTable('product')
    .dropTable('status');
};
