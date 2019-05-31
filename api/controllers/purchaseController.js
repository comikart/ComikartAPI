const service = require('../services/purchaseService');

const savePurchase = (req, res) => {
  const { id } = req.params;
  const { purchase } = req.body;

  return service
    .savePurchase(id, purchase)
    .then(result => {
      res.status(201).json({ result });
    })
    .catch(err => res.status(400).json(err));
};

const findPurchaseByUserId = (req, res) => {
  const { id } = req.params;
  const { status } = req.query;

  return service
    .findPurchaseByUserId(id, status)
    .then(purchases => res.json(purchases))
    .catch(err => res.status(400).json(err));
};

const findPurchaseById = (req, res) => {
  const { purchase_id } = req.params;

  return service
    .findPurchaseById(purchase_id)
    .then(purchase => res.json(purchase))
    .catch(err => res.status(400).json(err));
};

module.exports = {
  savePurchase,
  findPurchaseByUserId,
  findPurchaseById
};
