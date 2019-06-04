process.env.NODE_ENV !== 'production' && require('dotenv').config(); //  loading env files only in development
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();

const userController = require('./api/controllers/userController');
const paymentOptionController = require('./api/controllers/paymentOptionController');
const purchaseController = require('./api/controllers/purchaseController');
const productController = require('./api/controllers/productController');

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
  res.json({status: 'connected'});
});

// route handler.
server.use('/api/user', userController);
server.use('/api/user/:id/paymentoption', paymentOptionController);
server.use('/api/user/:id/purchase', purchaseController);
server.use('/api/product', productController);

module.exports = server;