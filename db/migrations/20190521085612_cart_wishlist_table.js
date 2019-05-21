exports.up = function(knex, Promise) {
    return knex.schema.createTable('cart', (table) => {
        table.integer('user_id').references('id').inTable('user').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('product_id').references('id').inTable('product').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('quantity').notNullable;
    })
    .alterTable('cart', (table) => {
        table.primary(['user_id', 'product_id']);
    })
    .createTable('wish_list', (table) => {
        table.integer('user_id').references('id').inTable('user').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('product_id').references('id').inTable('product').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('quantity').notNullable;
    })
    .alterTable('wish_list', (table) => {
        table.primary(['user_id', 'product_id']);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cart').dropTable('wish_list');
};
