const knex = require('../../db/knex');

// GET all
const findAllStatus = () => knex('status').select();

// GET by ID
const findStatusById = id =>
  knex('status')
    .where({ id })
    .first();

// GET by title
const findStatusByTitle = title =>
  knex('status')
    .where({ title })
    .first();

module.exports = {
  findAllStatus,
  findStatusById,
  findStatusByTitle,
};
