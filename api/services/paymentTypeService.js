const knex = require('../../db/knex');

// GET
const findAllPaymentType = () => knex('payment_type').select();

// GET by Id
const findPaymentTypeById = id => knex('payment_type').where({ id });

module.exports = {
  findAllPaymentType,
  findPaymentTypeById,
};
