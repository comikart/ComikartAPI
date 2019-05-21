
exports.up = function(knex, Promise) {
    return knex.schema.createTable('review', (table) => {
        table.increments('id');
        table.integer('product_id').references('id').inTable('product').onDelete('CASCADE');
        table.integer('user_id').references('id').inTable('user').onDelete('CASCADE');
        table.integer('score');
        table.datetime('date_created').defaultTo(knex.fn.now());
        table.string('title').notNullable();
        table.text('description').notNullable();
    })
    .alterTable('review', (table) => {
        table.unique(['product_id', 'user_id']);
    })
    .createTable('comment', (table) => {
        table.increments('id');
        table.integer('user_id').references('id').inTable('user').onDelete('CASCADE');
        table.integer('review_id').references('id').inTable('review').onDelete('CASCADE');
        table.text('description');
        table.datetime('date_created').defaultTo(knex.fn.now());
    })
    .createTable('helpful', (table) => {
        table.integer('review_id').references('id').inTable('review').onDelete('CASCADE');
        table.integer('user_id').references('id').inTable('user').onDelete('CASCADE');
    })
    .alterTable('helpful', (table) => {
        table.primary(['review_id', 'user_id']);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comment').dropTable('helpful').dropTable('review');
};
