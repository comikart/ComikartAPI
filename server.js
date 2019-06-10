process.env.NODE_ENV !== 'production' && require('dotenv').config(); // loading some modules only in development
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cron = require('node-cron');
const expressOasGenerator = require('express-oas-generator');
const { preSpec } = require('./swaggerOptions');
const server = express();
expressOasGenerator.init(server, preSpec); // swagger OAS generator

const userController = require('./api/controllers/userController');
const paymentOptionController = require('./api/controllers/paymentOptionController');
const purchaseController = require('./api/controllers/purchaseController');
const productController = require('./api/controllers/productController');
const reviewController = require('./api/controllers/reviewController');
const couponController = require('./api/controllers/couponController');
const task = require('./api/utils/task');

// mount middleware
server.use(cors());
server.use(helmet());
server.use(express.json());

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
