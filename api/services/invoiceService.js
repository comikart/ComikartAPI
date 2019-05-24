const knex = require('../../db/knex');

// GET
const findAllInvoices = () => knex('invoice').select();

// GET invoice by Id
const findInvoiceById = id => knex('invoice').where({ id });

// POST invoice
const saveInvoice = invoice => knex('invoice').insert(invoice);

// PUT invoice
const updateInvoice = (id, invoice) =>
  knex('invoice')
    .where({ id })
    .update(invoice);

// DELETE invoice
const deleteInvoice = invoice =>
  knex('invoice')
    .where({ id: invoice.id })
    .del();

// DELETE by ID
const deleteInvoiceById = id => knex.where({ id }).del();

module.exports = {
  findAllInvoices,
  findInvoiceById,
  saveInvoice,
  updateInvoice,
  deleteInvoice,
  deleteInvoiceById,
};
