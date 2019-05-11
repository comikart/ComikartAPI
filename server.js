process.env.NODE_ENV !== 'production' && require('dotenv').load(); //  loading env files only in development
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

let port = process.env.PORT || 5000;
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
 *
 * @apiSuccess {String} Status Connected
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "Connected"
 *     }
 *
 * @apiUse ServerError
 */
server.get('/', (req, res) => {
  res.json({status: 'connected'});
});

// add routes
routes(server);

//port listener
server.listen(port , () => {
  console.log(`server listening on port ${port}`);
})