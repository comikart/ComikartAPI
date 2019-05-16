process.env.NODE_ENV !== 'production' && require('dotenv').config(); //  loading env files only in development
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
const routes = require('./api/routes/routes');

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

// add routes
routes(server);


module.exports = server;