const knex = require('../../db/knex');
const statusService = require('./statusService');
const invoiceService = require('./invoiceService');
const userService = require('./userService');

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
    .select('purchase_product.*', 'product.title as product_title')
    .innerJoin('product', 'purchase_product.product_id', 'product.id')
    .from('purchase_product')
    .where({ purchase_id });

const savePurchaseProduct = purchase_product =>
  knex('purchase_product').insert(purchase_product);

const findPurchaseByUserId = (user_id, status) => {
  !status && (status = 'open');

  return statusService
    .findStatusByTitle(status)
    .then(status => knex('purchase').where({ user_id, status_id: status.id }));
};

const savePurchase = (id, purchase) => {
  return userService
    .findCartSubTotalByUserId(id)
    .then(subTotal => {
      // creating the invoice.
      const tax = 1.0; //TODO get the proper tax by state

      const invoice = {
        sub_total: subTotal,
        tax: tax,
        total: subTotal * tax,
        shipping_address: purchase.shipping_address,
        payment_id: purchase.payment_id
      };

      return invoiceService.saveInvoice(invoice);
    })
    .then(result => {
      // creating the purchase
      const newPurchase = {
        user_id: id,
        invoice_id: result[0]
      };

      return Promise.all([
        knex('purchase').insert(newPurchase, 'id'),
        userService.findCartByUserId(id)
      ]);
    })
    .then(arr => {
      // moving cart items to the purchase_product table
      const newCart = arr[1].map(item => {
        delete item.user_id;
        item.purchase_id = arr[0][0];
        return item;
      });

      return Promise.all([
        savePurchaseProduct(newCart),
        userService.deleteCartByUserId(id)
      ]);
    });
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
