const router = require('express').Router();
const { authorization } = require('../utils/security');
const adminService = require('../services/adminService.js');

router.use('/', authorization);

// purchase history filter by date, and status.
// shipping history filter by date.
// clients list filter by id
// products list
// product
// reviews by product
// comments by review

router.route('/clients').get((req, res) => {
  return adminService.findAllClients().then(clients => res.json(clients));
});

router.route('/purchases').get((req, res) => {
  const { status } = req.query;
  return adminService
    .findPurchases(status)
    .then(purchases => res.json(purchases));
});

router.route('/purchases/:id').put((req, res) => {
  const { id } = req.params;
  const { status_id } = req.body;
  adminService.updatePurchaseStatus(id, status_id).then(() => res.json({}));
});

router.route('/total-purchases').get((req, res) => {
  return adminService
    .findTotalPurchasesByMonthAndYear()
    .then(history => res.json(history))
    .catch(err => res.status(400).json(err));
});

router.route('/sales').get((req, res) => {
  const { start, end } = req.query;
  return adminService
    .findTotalSalesByMonthAndYear(start, end)
    .then(sales => res.json(sales))
    .catch(err => res.status(400).json(err));
});

router
  .route('/products')
  .get((req, res) => {
    return adminService.findAllProducts().then(products => res.json(products));
  })
  .post((req, res) => {
    const product = req.body;
    adminService.saveProduct(product).then(() => res.status(201).json({}));
  });

router
  .route('/products/:product_id')
  .get((req, res) => {
    const { product_id } = req.params;
    return adminService
      .findProductById(product_id)
      .then(product => res.json(product));
  })
  .put((req, res) => {
    const { product_id } = req.params;
    const update = req.body;
    return adminService.updateProduct(product_id).then(() => res.json({}));
  })
  .delete((req, res) => {
    const { product_id } = req.params;
    return adminService
      .deleteProduct(product_id)
      .then(() => res.status(204).json({}))
      .catch(err => res.status(400).json(err));
  });

router.route('/products/:product_id/reviews').get((req, res) => {
  const { product_id } = req.params;
  return adminService
    .findAllReviewByProductId(product_id)
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json(err));
});

router.route('/products/:product_id/reviews/:review_id').get((req, res) => {
  const { review_id } = req.params;
  return adminService
    .findReviewAndCommentAndHelpfulByReviewId(review_id)
    .then(review => res.json(review))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
