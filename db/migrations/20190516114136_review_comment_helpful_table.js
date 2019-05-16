
exports.up = function(knex, Promise) {
    return knex.schema.createTable('review', (table) => {
        table.integer('product_id').references('id').inTable('product').onDelete('CASCADE').primary();
        table.integer('user_id').references('id').inTable('user').onDelete('CASCADE').primary();
        table.integer('score');
        table.datetime('date_created').defaultTo(knex.fn.now());
        table.string('title').notNullable();
        table.text('description').notNullable();
    })
    .createTable('comment', (table) => {
        table.integer('user_id').references('id').inTable('user').onDelete('CASCADE').primary();
        table.integer('review_product_id').references('product_id').inTable('review').onDelete('CASCADE').primary();
        table.integer('review_user_id').references('user_id').inTable('review').onDelete('CASCADE').primary();
        table.text('description');
    })
    .createTable('helpful', (table) => {
        table.integer('review_product_id').references('product_id').inTable('review').onDelete('CASCADE').primary();
        table.integer('review_user_id').references('user_id').inTable('review').onDelete('CASCADE').primary();
        table.integer('user_id').references('id').inTable('user').onDelete('CASCADE').primary();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comment').dropTable('helpful').dropTable('review');
};
