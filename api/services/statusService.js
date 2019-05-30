const knex = require('../../db/knex');

// GET all
const findAllStatus = () => knex('status').select();

// GET by ID
const findStatusById = id => knex('status').where({ id });

const findStatusByTitle = title =>
  knex('status')
    .where({ title })
    .first();

// POST
const saveStatus = status => knex('status').insert(status);

// PUT
const updateStatus = (id, status) =>
  knex('status')
    .where({ id })
    .update(status);

// DELETE
const deleteStatus = status =>
  knex('status')
    .where({ id: status.id })
    .del();

// DELETE by ID
const deleteStatusById = id =>
  knex('status')
    .where({ id })
    .del();

module.exports = {
  findAllStatus,
  findStatusById,
  findStatusByTitle,
  saveStatus,
  updateStatus,
  deleteStatus,
  deleteStatusById
};
