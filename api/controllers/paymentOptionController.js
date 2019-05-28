const service = require('../services/paymentOptionService');

/**
 * @api {get} /api/paymentoption/:id Retrieve All Payment Options By ID
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
 *        "credit_card": 424242424242,
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

const findAllPaymentOptionsByUser = (req, res) => {
  const { id } = req.params;

  return service
    .findAllPaymentOptionsByUser(id)
    .then(paymentOptions => res.json(paymentOptions))
    .catch(err => res.status(400).json(err));
};

module.exports = {
  findAllPaymentOptionsByUser,
};
