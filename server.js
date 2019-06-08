process.env.NODE_ENV !== 'production' && require('dotenv').config(); //  loading env files only in development
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();
const cron = require('node-cron');
const task = require('./api/utils/task');

const userController = require('./api/controllers/userController');
const paymentOptionController = require('./api/controllers/paymentOptionController');
const purchaseController = require('./api/controllers/purchaseController');
const productController = require('./api/controllers/productController');
const reviewController = require('./api/controllers/reviewController');
const couponController = require('./api/controllers/couponController');

// mount middleware
server.use(cors());
server.use(helmet());
server.use(express.json());

/**
 * @api {get} / Request Sanitation Check
 * @apiVersion 1.0.0
 * @apiName GETSanitationCheck
 * @apiGroup Server
 *
 * @apiSuccess {String} Status Connected
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "Connected"
 *     }
 */
server.get('/', (req, res) => {
  res.json({ status: 'connected' });
});

// route handler.
server.use('/api/user', userController);
server.use('/api/user', paymentOptionController);
server.use('/api/user', purchaseController);
server.use('/api/product', productController);
server.use('/api/product', couponController);
server.use('/api/product', reviewController);

cron.schedule('59 10,23 * * *', task.deleteInvalidTokens);

module.exports = server;
