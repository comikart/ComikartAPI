const knex = require('../../db/knex');

const findAllProducts = () => knex('product').select();

const findProductById = id => knex('product').where({ id });

const findProductByCategory = category =>
  knex
    .from('product')
    .innerJoin('category', 'product.category_id', 'category.id')
    .where('category.title', '=', category);

const saveProduct = product => knex('product').insert(product);

//accepts the id of the table to be updated, and the fields to be updated in an object.
const updateProduct = (id, product) =>
  knex('product')
    .where({ id })
    .update(product);

const deleteProduct = product =>
  knex('product')
    .where({ id: product.id })
    .del();

const deleteProductById = id =>
  knex('product')
    .where({ id })
    .del();

module.exports = {
  findAllProducts,
  findProductById,
  findProductByCategory,
  saveProduct,
  updateProduct,
  deleteProduct,
  deleteProductById
};
