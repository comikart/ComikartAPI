const knex = require('../../db/knex');

const findAllClients = () => knex('user').where({ role_id: 2 });

const findAllProducts = () => knex('product').select();

const findProductById = id => knex('product').where({ id });

const updateProduct = (id, product) =>
  knex('product')
    .where({ id })
    .update(product);

const deleteProduct = id =>
  knex('product')
    .where({ id })
    .del();

const saveProduct = product => knex('product').insert(product);

/**
 * @param {String} status Optional - filters orders by status. (open, shipping, complete, closed)
 */
const findPurchases = status => {
  return knex
    .select('status.title as status', 'purchase.*')
    .from('purchase')
    .innerJoin('status', 'purchase.status_id', 'status.id')
    .where(knex.raw(`status.title like '%${status ? status : ''}%'`))
    .orderBy('date_created', 'desc');
};

const updatePurchaseStatus = (id, status_id) => {
  return knex('purchase')
    .where({ id })
    .update({ status_id });
};

const findTotalPurchasesByMonthAndYear = () => {
  return knex
    .select(knex.raw("to_char(purchase.date_created, 'Mon-YYYY') as date"))
    .count('*')
    .from('purchase')
    .innerJoin('invoice', 'purchase.invoice_id', 'invoice.id')
    .groupBy('date');
};
/**
 * @description returns total sales in USD by month and year.
 * @param {Date String} date_start
 * @example 06-2018 year is optional unless adding an end date, month is also optional if searching by year
 * @param {Date String} date_end
 * @example 07-2019 Year is required
 */
const findTotalSalesByMonthAndYear = (date_start, date_end) => {
  return knex
    .select(knex.raw("to_char(purchase.date_created, 'Mon-YYYY') as date"))
    .sum('total')
    .from('purchase')
    .innerJoin('invoice', 'purchase.invoice_id', 'invoice.id')
    .groupBy('date')
    .where(
      knex.raw(
        `to_char(purchase.date_created, 'MM-YYYY') ${
          date_end
            ? `between '%${date_start}%' and '%${date_end}%'`
            : `like '%${date_start ? date_start : ''}%'`
        }`,
      ),
    );
};

module.exports = {
  findAllClients,
  findAllProducts,
  findProductById,
  updateProduct,
  saveProduct,
  deleteProduct,
  findPurchases,
  updatePurchaseStatus,
  findTotalPurchasesByMonthAndYear,
  findTotalSalesByMonthAndYear,
};
