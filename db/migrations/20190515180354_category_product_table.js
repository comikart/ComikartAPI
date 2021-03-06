exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('category', table => {
      table.increments('id');
      table
        .string('title')
        .notNullable()
        .unique();
    })
    .createTable('product', table => {
      table.increments('id');
      table
        .string('title')
        .notNullable()
        .unique();
      table.decimal('unit_price');
      table.boolean('is_discontinued').defaultTo(false);
      table.string('author', 30);
      table.text('description').notNullable();
      table.string('series');
      table.string('issue');
      table.string('paperback');
      table.string('publisher');
      table.string('isbn', 13);
      table.string('weight');
      table.string('dimensions');
      table.string('product_tax_code', 5);
      table
        .integer('category_id')
        .references('id')
        .inTable('category')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('product').dropTable('category');
};
