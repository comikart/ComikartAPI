const service = require('../services/productService');
const router = require('express').Router();

router.route('/').get((req, res) => {
  const { category, page = 1, count = 10 } = req.query;
  return (!category
    ? service.findAllProducts(page, count)
    : service.findProductByCategory(category, page, count)
  )
    .then(products => res.json(products))
    .catch(err => res.status(500).json(err));
});

router.route('/:id').get((req, res) => {
  const { id } = req.params;

  return service
    .findProductById(id)
    .then(product => res.json(product))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
