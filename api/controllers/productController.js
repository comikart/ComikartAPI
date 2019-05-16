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
 *
 * @apiError ServerError server couldnt process the request
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Server Error
 *     {
 *          "error": "server was unable to process the request."
 *     }
 */
const findAllProducts = (req, res) => {
    const { category } = req.query;
    if (!category) {
        service.findAllProducts()
        .then(products => res.json(products))
        .catch(err => res.status(500).json(err));
    } else {
        service.findProductByCategory(category)
        .then(products => res.json(products))
        .catch(err => res.status(500).json(err));
    }
}

/**
 * @api {get} /api/product/:id Request Product By Id
 * @apiVersion 1.0.0
 * @apiName GETProductById
 * @apiGroup Product
 *
 * @apiSuccess {object[]} List product information array.
 * @apiParam {number} ID returns a product by id.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *        {
 *          "id": 1,
 *          "first_name": "john",
 *          "last_name": "doe",
 *          "role_id": 2
 *        }
 *
 * @apiError ServerError server couldnt process the request
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Server Error
 *     {
 *          "error": "server was unable to process the request."
 *     }
 */

const findProductById = (req, res) => {
    const { id } = req.params;

    return service.findProductById(id)
    .then(product => res.json(product))
    .catch(err => res.status(400).json(err));
}

module.exports = {
    findAllProducts,
    findProductById,
}
