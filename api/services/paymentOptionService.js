const knex = require('../../db/knex');

// GET
const findAllPaymentOption = () => knex('payment_option').select();

// GET by Id
const findAllPaymentOptionById = id => knex('payment_option').where({ id });

// POST
const savePaymentOption = paymentOption =>
  knex('payment_option').insert(paymentOption);

// PUT
const updatePaymentOption = (id, paymentOption) =>
  knex('payment_option')
    .where({ id })
    .update(paymentOption);

// DELETE
const deletePaymentOption = paymentOption =>
  knex('payment_option')
    .where({ id: paymentOption.id })
    .del();

// DELETE by id
const deletePaymentOptionById = id =>
  knex('payment_option')
    .where(id)
    .del();

module.exports = {
  findAllPaymentOption,
  findAllPaymentOptionById,
  savePaymentOption,
  updatePaymentOption,
  deletePaymentOption,
  deletePaymentOptionById,
};
