const service = require('../services/productService');

/**
 * @api {get} /api/product Request All Products
 * @apiVersion 1.0.0
 * @apiName GETProducts
 * @apiGroup Product
 *
 * @apiSuccess {object[]} List product information array.
 * @apiParam {query} Category returns all products in the category
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      [
 *        {
 *          "id": 1,
 *          "first_name": "john",
 *          "last_name": "doe",
 *          "role_id": 2
 *         },
 *      ]
 */
const findAllProducts = (req, res) => {
  const { category, page = 1, count = 10 } = req.query;
  (!category
    ? service.findAllProducts(page, count)
    : service.findProductByCategory(category, page, count)
  )
    .then(products => res.json(products))
    .catch(err => res.status(500).json(err));
};

/**
 * @api {get} /api/product/:id Request Product By Id
 * @apiVersion 1.0.0
 * @apiName GETProductById
 * @apiGroup Product
 *
 * @apiSuccess {object[]} List product information array.
 * @apiParam {Param} ID returns a product by id.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *        {
 *          "id": 1,
 *          "first_name": "john",
 *          "last_name": "doe",
 *          "role_id": 2
 *        }
 */

const findProductById = (req, res) => {
  const { id } = req.params;

  return service
    .findProductById(id)
    .then(product => res.json(product))
    .catch(err => res.status(400).json(err));
};

module.exports = {
  findAllProducts,
  findProductById
};
