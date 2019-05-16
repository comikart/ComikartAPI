const service = require('../services/productService');

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
