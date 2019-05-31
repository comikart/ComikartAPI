const service = require('../services/paymentOptionService');

/**
 * @api {get} /api//user/:id/paymentoption Retrieve All Payment Options By ID
 * @apiVersion 1.0.0
 * @apiName GETPaymentOptions
 * @apiGroup PaymentOptions
 *
 * @apiSuccess {object[]} List all payment options
 * @apiParam {Param} ID is user ID, used to find all payment options
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *    {
 *      "credit_card": 424242424242,
 *      "billing_address": "123 whambam st",
 *      "exp": "05/20",
 *      "security_number": 444,
 *      "active": false,
 *      "user_id": 1,
 *      "type_id": 1,
 *    },
 *    {
 *      "credit_card": 334323424242,
 *      "billing_address": "3233 jam st",
 *      "exp": "05/18",
 *      "security_number": 444,
 *      "active": false,
 *      "user_id": 1,
 *      "type_id": 2,
 *    },
 *  ]
 */

const findAllPaymentOptionByUser = (req, res) => {
  const { id } = req.params;

  return service
    .findAllPaymentOptionByUser(id)
    .then(paymentOptions => res.status(200).json(paymentOptions))
    .catch(err => res.status(400).json(err));
};

/**
 * @api {get} /api/user/paymentoption/:id Retrieve All Payment Options By ID
 * @apiVersion 1.0.0
 * @apiName GETPaymentOptions
 * @apiGroup PaymentOptions
 *
 * @apiSuccess {object[]} List all payment options
 * @apiParam {Param} ID is user ID, used to find all payment options
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *    {
 *      "credit_card": 424242424242,
 *      "billing_address": "123 whambam st",
 *      "exp": "05/20",
 *      "security_number": 444,
 *      "active": false,
 *      "user_id": 1,
 *      "type_id": 1,
 *    },
 */

const findPaymentOptionById = (req, res) => {
  const { id } = req.params;

  return service
    .findPaymentOptionById(id)
    .then(paymentOption => res.status(200).json(paymentOption))
    .catch(err => res.status(400).json(err));
};

/**
 * @api {post} /api/user/:id/paymentoption Retrieve All Payment Options By ID
 * @apiVersion 1.0.0
 * @apiName POSTPaymentOption
 * @apiGroup PaymentOptions
 *
 * @apiSuccess {object[]} Payment Option object, success
 * @apiParam {Param} ID is user ID, used to find all payment options
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 OK
 *    {
 *      "credit_card": 424242424242,
 *      "billing_address": "123 whambam st",
 *      "exp": "05/20",
 *      "security_number": 444,
 *      "active": false,
 *      "user_id": 1,
 *      "type_id": 1,
 *    },
 */

const savePaymentOption = (req, res) => {
  const { paymentOption } = req.body;
  const { id } = req.params;

  return service
    .savePaymentOption(paymentOption, id)
    .then(() => service.findAllPaymentOptionByUser(id))
    .then(paymentOptions => res.status(201).json(paymentOptions))
    .catch(err => res.status(400).json(err));
};

/**
 * @api {put} /api/user/:id/paymentoption/:paymentoption_id Update the payment option by ID
 * @apiVersion 1.0.0
 * @apiName PUTPaymentOption
 * @apiGroup PaymentOptions
 *
 * @apiSuccess {object[]} Payment Option object, success
 * @apiParam {Param} ID is user ID, used to find all payment options
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *    {
 *      "credit_card": 424242424242,
 *      "billing_address": "123 whambam st",
 *      "exp": "05/20",
 *      "security_number": 444,
 *      "active": false,
 *      "user_id": 1,
 *      "type_id": 1,
 *    },
 *    {
 *      "credit_card": 424242424242,
 *      "billing_address": "123 whambam st",
 *      "exp": "05/20",
 *      "security_number": 444,
 *      "active": false,
 *      "user_id": 1,
 *      "type_id": 1,
 *    },
 */

const updatePaymentOption = (req, res) => {
  const { paymentOption } = req.body;
  const { id, paymentoption_id } = req.params;

  return service
    .updatePaymentOption(paymentOption, paymentoption_id)
    .then(() => service.findAllPaymentOptionByUser(id))
    .then(paymentOptions => res.status(200).json(paymentOptions))
    .catch(err => res.status(400).json(err));
};

/**
 * @api {delete} /api/user/:id/paymentoption Delete the paymentoption by paymentoption id
 * @apiVersion 1.0.0
 * @apiName DELETEPaymentOption
 * @apiGroup PaymentOptions
 *
 * @apiSuccess {object[]} Payment Option object, success
 * @apiParam {Param} ID is user ID, used to find all payment options
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *    {
 *      "credit_card": 424242424242,
 *      "billing_address": "123 whambam st",
 *      "exp": "05/20",
 *      "security_number": 444,
 *      "active": false,
 *      "user_id": 1,
 *      "type_id": 1,
 *    },
 * {
 *      "credit_card": 424242424242,
 *      "billing_address": "123 whambam st",
 *      "exp": "05/20",
 *      "security_number": 444,
 *      "active": false,
 *      "user_id": 1,
 *      "type_id": 1,
 *    },
 */

const deletePaymentOption = (req, res) => {
  const { paymentOption } = req.body;
  const { id } = req.params;

  return service
    .deletePaymentOption(paymentOption)
    .then(() => service.findAllPaymentOptionByUser(id))
    .then(paymentOptions => res.status(200).json(paymentOptions))
    .catch(err => res.status(400).json(err));
};

/**
 * @api {delete} /api/user/:id/paymentoption Delete the paymentoption by paymentoption id
 * @apiVersion 1.0.0
 * @apiName DELETEPaymentOption
 * @apiGroup PaymentOptions
 *
 * @apiSuccess {object[]} Payment Option object, success
 * @apiParam {Param} ID is user ID, used to find all payment options
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *    {
 *      "credit_card": 424242424242,
 *      "billing_address": "123 whambam st",
 *      "exp": "05/20",
 *      "security_number": 444,
 *      "active": false,
 *      "user_id": 1,
 *      "type_id": 1,
 *    },
 * {
 *      "credit_card": 424242424242,
 *      "billing_address": "123 whambam st",
 *      "exp": "05/20",
 *      "security_number": 444,
 *      "active": false,
 *      "user_id": 1,
 *      "type_id": 1,
 *    },
 */

const deletePaymentOptionById = (req, res) => {
  const { id, paymentoption_id } = req.params;

  return service
    .deletePaymentOptionById(paymentoption_id)
    .then(() => service.findAllPaymentOptionByUser(id))
    .then(paymentOptions => res.status(200).json(paymentOptions))
    .catch(err => res.status(400).json(err));
};

module.exports = {
  findAllPaymentOptionByUser,
  findPaymentOptionById,
  savePaymentOption,
  updatePaymentOption,
  deletePaymentOption,
  deletePaymentOptionById,
};
