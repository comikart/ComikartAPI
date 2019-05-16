const router = require('express').Router();
const { authorization, authenticate } = require('../utils/security');
const { login, register } = require('../controllers/userController');
const { findAllProducts, findProductById } = require('../controllers/productController');


router.use('/user/login', authenticate, login);
router.route('/user/register').post(register);
router.route('/product').get(findAllProducts);
router.route('/product/:id').get(findProductById);

module.exports = router;