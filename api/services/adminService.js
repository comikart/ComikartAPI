const knex = require('../../db/knex');

const findAllClients = () => knex('user').where({ role_id: 2 }); // todo remove the hard coded id

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

const findPurchaseById = id => {
  return knex('purchase')
    .where({ id })
    .first();
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

const findAllReviewByProductId = product_id => {
  return knex('review').where({ product_id });
};
const findReviewAndHelpfulByReviewId = id => {
  return knex
    .select(
      knex.raw(
        `review.*, (select count(*) from helpful where helpful.review_id = ${id}) as helpful`,
      ),
    )
    .from('review')
    .where({ id });
};

const findAllCommentsByReviewId = (review_id, user_id) => {
  return knex('comment').where(
    knex.raw(
      `review_id = ${review_id} ${user_id ? `and user_id = ${user_id}` : ''}`,
    ),
  );
};

const findAllHelpfulByReviewId = review_id => {
  return knex('helpful').where({ review_id });
};

const findReviewAndCommentAndHelpfulByReviewId = id => {
  return Promise.all([
    findReviewAndHelpfulByReviewId(id),
    findAllCommentsByReviewId(id),
  ]).then(arr => {
    return Object.assign({}, ...arr[0], { comments: arr[1] });
  });
};

const findCommentById = id => {
  return knex('comment').where({ id });
};

module.exports = {
  findAllClients,
  findAllProducts,
  findProductById,
  updateProduct,
  saveProduct,
  deleteProduct,
  findPurchases,
  findPurchaseById,
  updatePurchaseStatus,
  findTotalPurchasesByMonthAndYear,
  findTotalSalesByMonthAndYear,
  findAllReviewByProductId,
  findReviewAndCommentAndHelpfulByReviewId,
  findAllHelpfulByReviewId,
  findAllCommentsByReviewId,
  findCommentById,
};
