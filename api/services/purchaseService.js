const knex = require('../../db/knex');
const statusService = require('./statusService');
const invoiceService = require('./invoiceService');
const userService = require('./userService');
const paymentOptionService = require('./paymentOptionService');
const Taxjar = require('taxjar');
const client = new Taxjar({ apiKey: process.env.TAXJAR_API_KEY });

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
        findPurchaseProductByPurchaseId(purchase.id),
      ]).then(arr =>
        Object.assign({}, purchase, {
          invoice: arr[0],
          products: arr[1],
        }),
      ),
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
    .then(async subTotal => {
      // creating the tax info and submitting to taxjar
      const payload = {
        from_country: 'US', // TODO convert hardcoded data to variable data.
        from_city: 'Las Vegas',
        from_state: 'NV',
        from_street: 'Lake Mead Blvd',
        amount: subTotal,
        shipping: 5.0,
      };
      let street, city, state, country, zip_code;
      if (purchase.same_address) {
        const paymentOptions = await paymentOptionService.findAllPaymentOptionByUser(
          id,
        );
        const paymentOption = paymentOptions.filter(
          option => option.id === purchase.payment_id,
        );
        const { street, city, state, country, zip_code } = paymentOption;
        street = street;
        city = city;
        state = state;
        country = country;
        zip_code = zip_code;
      } else {
        const { street, city, state, country, zip_code } = purchase.address;
        street = street;
        city = city;
        state = state;
        country = country;
        zip_code = zip_code;
      }
      payload.to_country = country;
      payload.to_city = city;
      payload.to_street = street;
      payload.to_state = state;
      payload.to_zip = zip_code;
      return client.taxForOrder(payload);
    })
    .then(res => {
      // creating the invoice.
      const invoice = {
        sub_total: res.tax.taxable_amount,
        tax: res.tax.amount_to_collect,
        shipping: res.tax.shipping,
        total: res.tax.order_total_amount,
        payment_id: purchase.payment_id,
      };

      return invoiceService.saveInvoice(invoice);
    })
    .then(result => {
      // creating the purchase
      const newPurchase = {
        user_id: id,
        invoice_id: result[0],
      };

      return Promise.all([
        knex('purchase').insert(newPurchase, 'id'),
        userService.findCartByUserId(id),
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
        userService.deleteCartByUserId(id),
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
  deletePurchaseById,
};
