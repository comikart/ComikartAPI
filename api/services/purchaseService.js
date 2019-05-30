const knex = require('../../db/knex');
const statusService = require('./statusService');

const findPurchaseById = id => knex('purchase').where({ id });

const findPurchaseByUserId = (user_id, status) => {
  !status ? (status = 'open') : null;

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
