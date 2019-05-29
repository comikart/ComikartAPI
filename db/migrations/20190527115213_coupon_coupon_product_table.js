exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('coupon', table => {
      table.increments('id');
      table.string('code').notNullable();
      table.decimal('discount').defaultTo(0);
      table.boolean('is_percent').notNullable();
    })
    .createTable('coupon_product', table => {
      table
        .integer('coupon_id')
        .references('id')
        .inTable('coupon')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .integer('product_id')
        .references('id')
        .inTable('product')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .alterTable('coupon_product', table => {
      table.primary(['coupon_id', 'product_id']);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('coupon_product').dropTable('coupon');
};
