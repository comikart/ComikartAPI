
exports.up = function(knex, Promise) {
  return knex.schema.createTable('role', (table) => {
      table.increments('id');
      table.string('description').notNullable();
  })
  .createTable('user', (table) => {
      table.increments('id');
      table.string('first_name');
      table.string('last_name');
      table.string('email').unique();
      table.string('password');
      table.timestamp('date_created').defaultTo(knex.fn.now());
      table.integer('role_id').references('id').inTable('role').onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user').dropTable('role');
};
