const router = require('express').Router();
const { authorization, authenticate } = require('../utils/security');
const userController = require('../controllers/userController');
const {
  findAllProducts,
  findProductById,
} = require('../controllers/productController');
const reviewController = require('../controllers/reviewController');
const paymentOptionController = require('../controllers/paymentOptionController');

// <============= User ===========>
router.use('/user/login', authenticate, userController.login);
router.route('/user/register').post(userController.register);
router.route('/user/:id').get(userController.findUserById);
router.route('/user/:id/cart').get(userController.findCartByUserId);
router
  .route('/user/:id/cart/:product_id')
  .get(userController.moveCartItemToWishList);
router.route('/user/:id/wishlist').get(userController.findWishListByUserId);
router
  .route('/user/:id/wishlist/:product_id')
  .get(userController.moveWishListItemToCart);
router
  .route('/user/:id/paymentoption/')
  .get(paymentOptionController.findAllPaymentOptionByUser);
router
  .route('/user/:id/paymentoption/:paymentoption_id')
  .get(paymentOptionController.findPaymentOptionById);
router
  .route('/user/:id/paymentoption')
  .post(paymentOptionController.savePaymentOption);
router
  .route('/user/:id/paymentoption/:paymentoption_id')
  .put(paymentOptionController.updatePaymentOption);

// <============= Product ===========>
router.route('/product').get(findAllProducts);
router.route('/product/:id').get(findProductById);
router
  .route('/product/:product_id/review')
  .get(reviewController.findReviewByProductId);
router.route('/product/:product_id/review').post(reviewController.saveReview);
router
  .route('/product/:product_id/review/:review_id')
  .get(reviewController.findReviewById);
router
  .route('/product/:product_id/review/:review_id')
  .delete(reviewController.deleteReview);
router
  .route('/product/:product_id/review/:review_id/comment')
  .get(reviewController.findAllCommentsByReviewId);
router
  .route('/product/:product_id/review/:review_id/comment')
  .post(reviewController.saveComment);
router
  .route('/product/:product_id/review/:review_id/comment/:comment_id')
  .delete(reviewController.deleteComment);
router
  .route('/product/:product_id/review/:review_id/helpful')
  .post(reviewController.saveHelpful);

module.exports = router;
