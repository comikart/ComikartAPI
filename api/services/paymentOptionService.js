const knex = require('../../db/knex');

// GET
const findAllPaymentOptionByUser = id =>
  knex
    .from('payment_option')
    .innerJoin('payment_type', 'payment_option.type_id', 'payment_type.id')
    .where({ user_id: id });

// GET by Id
const findPaymentOptionById = id => knex('payment_option').where({ id });

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
  findAllPaymentOptionByUser,
  findPaymentOptionById,
  savePaymentOption,
  updatePaymentOption,
  deletePaymentOption,
  deletePaymentOptionById,
};
