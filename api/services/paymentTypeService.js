const knex = require('../../db/knex');

// GET
const findAllPaymentType = () => knex('payment_type').select();

// GET by Id
const findPaymentTypeById = id => knex('payment_type').where({ id });

// POST
const savePaymentType = paymentType => knex('payment_type').insert(paymentType);

// PUT
const updatePaymentType = (id, paymentType) =>
  knex('payment_type')
    .where({ id })
    .update(paymentType);

// DELETE
const deletePaymentType = paymentType =>
  knex('payment_type')
    .where({ id: paymentType.id })
    .del();

// DELETE by Id
const deletePaymentTypeById = id =>
  knex('payment_type')
    .where({ id })
    .del();

module.exports = {
  findAllPaymentType,
  findPaymentTypeById,
  savePaymentType,
  updatePaymentType,
  deletePaymentType,
  deletePaymentTypeById,
};
