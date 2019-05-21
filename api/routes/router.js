const router = require('express').Router();
const { authorization, authenticate } = require('../utils/security');
const { login, register } = require('../controllers/userController');
const { findAllProducts, findProductById } = require('../controllers/productController');
const reviewController = require('../controllers/reviewController');


router.use('/user/login', authenticate, login);
router.route('/user/register').post(register);
router.route('/product').get(findAllProducts);
router.route('/product/:id').get(findProductById);
router.route('/product/:product_id/review').get(reviewController.findReviewByProductId);
router.route('/product/:product_id/review').post(reviewController.saveReview);
router.route('/product/:product_id/review/:review_id').get(reviewController.findReviewById);
router.route('/product/:product_id/review/:review_id').delete(reviewController.deleteReview);
router.route('/product/:product_id/review/:review_id/comment').get(reviewController.findAllCommentsByReviewId);
router.route('/product/:product_id/review/:review_id/comment').post(reviewController.saveComment);
router.route('/product/:product_id/review/:review_id/comment/:comment_id').delete(reviewController.deleteComment);
router.route('/product/:product_id/review/:review_id/helpful').post(reviewController.saveHelpful);

module.exports = router;