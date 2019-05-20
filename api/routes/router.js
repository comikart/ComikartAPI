const router = require('express').Router();
const { authorization, authenticate } = require('../utils/security');
const { login, register } = require('../controllers/userController');
const { findAllProducts, findProductById } = require('../controllers/productController');
const reviewController = require('../controllers/reviewController');


router.use('/user/login', authenticate, login);
router.route('/user/register').post(register);
router.route('/product').get(findAllProducts);
router.route('/product/:id').get(findProductById);
router.route('/product/:id/review').get(reviewController.findReviewByProductId);
router.route('/product/:product_id/review/:id').get(reviewController.findReviewById);

module.exports = router;