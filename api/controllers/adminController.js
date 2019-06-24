const router = require('express').Router();
const { authorization, authenticate } = require('../utils/security');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const adminService = require('../services/adminService.js');
const redis = require('../services/blackListService');

router.route('/login').post(authenticate, (req, res) => {
  const { token, email } = req.body;
  return adminService
    .findAdminByEmail(email)
    .then(user => {
      res.json({ token, user });
    })
    .catch(err => res.status(400).json(err));
});

router.route('/logout').get(authorization, (req, res) => {
  const token = req.get('Authorization');
  redis
    .blackList(token)
    .then(() => res.status(200).json({ message: 'Logged out' }))
    .catch(err => res.status(400).json({ err: err }));
});

router.route('/user').put(authorization, (req, res) => {
  const { id } = req.decoded;
  const update = req.body;
  update.password
    ? (update.password = bcrypt.hashSync(update.password, SALT_ROUNDS))
    : null;
  return adminService.updateAdmin(id, update).then(user => res.json(user));
});

router.route('/clients').get(authorization, (req, res) => {
  return adminService.findAllClients().then(clients => res.json(clients));
});

router.route('/purchases').get(authorization, (req, res) => {
  const { status } = req.query;
  return adminService
    .findPurchases(status)
    .then(purchases => res.json(purchases));
});

router
  .route('/purchases/:id')
  .get(authorization, (req, res) => {
    const { id } = req.params;
    return adminService
      .findPurchaseById(id)
      .then(purchase => res.json(purchase));
  })
  .put(authorization, (req, res) => {
    const { id } = req.params;
    const { status_id } = req.body;
    adminService
      .updatePurchaseStatus(id, status_id)
      .then(() => adminService.findPurchaseById(id))
      .then(purchase => res.json(purchase));
  });

router.route('/total-purchases').get(authorization, (req, res) => {
  return adminService
    .findTotalPurchasesByMonthAndYear()
    .then(history => res.json(history))
    .catch(err => res.status(400).json(err));
});

router.route('/sales').get(authorization, (req, res) => {
  const { start, end } = req.query;
  return adminService
    .findTotalSalesByMonthAndYear(start, end)
    .then(sales => res.json(sales))
    .catch(err => res.status(400).json(err));
});

router
  .route('/products')
  .get(authorization, (req, res) => {
    return adminService
      .findAllProducts()
      .then(products => res.json(products))
      .catch(err => res.status(500).json(err));
  })
  .post(authorization, (req, res) => {
    const product = req.body;
    adminService
      .saveProduct(product)
      .then(() => adminService.findAllProducts())
      .then(products => res.status(201).json(products))
      .catch(err => res.status(400).json(err));
  });

router
  .route('/products/:product_id')
  .get(authorization, (req, res) => {
    const { product_id } = req.params;
    return adminService
      .findProductById(product_id)
      .then(product => res.json(product))
      .catch(err => res.status(400).json(err));
  })
  .put(authorization, (req, res) => {
    const { product_id } = req.params;
    const update = req.body;
    return adminService
      .updateProduct(product_id)
      .then(() => findProductById(product_id))
      .then(product => res.json(product))
      .catch(err => res.status(400).json(err));
  })
  .delete(authorization, (req, res) => {
    const { product_id } = req.params;
    return adminService
      .deleteProduct(product_id)
      .then(() => res.status(204).json({}))
      .catch(err => res.status(400).json(err));
  });

router.route('/products/:product_id/reviews').get(authorization, (req, res) => {
  const { product_id } = req.params;
  return adminService
    .findAllReviewByProductId(product_id)
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json(err));
});

router
  .route('/products/:product_id/reviews/:review_id')
  .get(authorization, (req, res) => {
    const { review_id } = req.params;
    return adminService
      .findReviewAndCommentAndHelpfulByReviewId(review_id)
      .then(review => res.json(review))
      .catch(err => res.status(400).json(err));
  });

router
  .route('/products/:product_id/reviews/:review_id/comments')
  .get(authorization, (req, res) => {
    const { review_id } = req.params;
    const { user_id } = req.query;
    return adminService
      .findAllCommentsByReviewId(review_id, user_id)
      .then(comments => res.json(comments))
      .catch(err => res.status(400).json(err));
  });
router
  .route('/products/:product_id/reviews/:review_id/helpful')
  .get(authorization, (req, res) => {
    const { review_id } = req.params;
    adminService
      .findAllHelpfulByReviewId(review_id)
      .then(helpful => res.json(helpful))
      .catch(err => res.status(400).json(err));
  });

router
  .route('/products/:product_id/reviews/:review_id/comments/:comment_id')
  .get(authorization, (req, res) => {
    const { comment_id } = req.params;
    adminService
      .findCommentById(comment_id)
      .then(comment => res.json(comment))
      .catch(err => res.status(400).json(err));
  });

module.exports = router;
