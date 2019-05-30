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
    .then(paymentOptions => res.status(200).json(paymentOptions))
    .catch(err => res.status(400).json(err));
};

/**
 * @api {get} /api/user/:id/paymentoption Retrieve All Payment Options By ID
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
  const { paymentOption, paymentType } = req.body;
  const { id } = req.params;

  paymentOption.user_id = id;
  paymentOption.type_id = paymentType.id;

  return service
    .savePaymentOption(paymentOption)
    .then(paymentOption => res.status(201).json(paymentOption))
    .catch(err => res.status(400).json(err));
};

module.exports = {
  findAllPaymentOptionByUser,
  findPaymentOptionById,
  savePaymentOption,
};
