const knex = require('../../db/knex');

const findPurchaseByUserId = user_id => knex('purchase').where({ user_id });

const findPurchaseByStatusId = status_id =>
  knex('purchase')
    .where({ status_id })
    .orderBy('date_created', 'desc');

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
  findPurchaseByUserId,
  findPurchaseByStatusId,
  savePurchase,
  updatePurchase,
  deletePurchaseById
};
