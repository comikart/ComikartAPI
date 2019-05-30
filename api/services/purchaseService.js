const knex = require('../../db/knex');
const statusService = require('./statusService');
const invoiceService = require('./invoiceService');

const findPurchaseById = id => {
  return knex
    .select('purchase.*', 'status.title as status')
    .from('purchase')
    .innerJoin('status', 'purchase.status_id', 'status.id')
    .where('purchase.id', id)
    .first()
    .then(purchase =>
      Promise.all([
        invoiceService.findInvoiceById(purchase.invoice_id),
        findPurchaseProductByPurchaseId(purchase.id)
      ]).then(arr =>
        Object.assign({}, purchase, {
          invoice: arr[0],
          products: arr[1]
        })
      )
    );
};

const findPurchaseProductByPurchaseId = purchase_id =>
  knex
    .select(
      'purchase_product.*',
      knex.raw(
        "json_build_object('id', product.id, 'title', product.title, 'unit_price', product.unit_price, 'is_discontinued', product.is_discontinued, 'author', product.author, 'description', product.description, 'series', product.series, 'paperback', product.paperback, 'publisher', product.publisher, 'isbn', product.isbn, 'weight', product.weight, 'dimensions', product.dimensions, 'product_code', product.product_code, 'category_id', product.category_id) as product"
      )
    )
    .innerJoin('product', 'purchase_product.product_id', 'product.id')
    .from('purchase_product')
    .where({ purchase_id });

const findPurchaseByUserId = (user_id, status) => {
  !status && (status = 'open');

  return statusService
    .findStatusByTitle(status)
    .then(status => knex('purchase').where({ user_id, status_id: status.id }));
};

const savePurchase = (id, purchase) => {
  purchase.user_id = id;
  return knex('purchase').insert(purchase);
};

const updatePurchase = purchase => knex('purchase').update(purchase);

const deletePurchaseById = id =>
  knex('purchase')
    .where({ id })
    .del();

module.exports = {
  findPurchaseById,
  findPurchaseByUserId,
  savePurchase,
  updatePurchase,
  deletePurchaseById
};
