const service = require('../services/purchaseService');

const savePurchase = (req, res) => {
  const { id } = req.params;
  const { purchase } = req.body;

  return service
    .savePurchase(id, purchase)
    .then(ret => {
      console.log(ret);
      res.status(201);
    })
    .catch(err => res.status(400).json(err));
};

module.exports = {
  savePurchase
};
