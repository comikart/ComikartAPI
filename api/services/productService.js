const knex = require('../../db/knex');

const findAllProducts = (page, count) =>
  knex('product')
    .select()
    .limit(count)
    .offset(page * count - count);

const findProductById = id => knex('product').where({ id });

const findProductByCategory = (category, page, count) =>
  knex
    .from('product')
    .innerJoin('category', 'product.category_id', 'category.id')
    .where('category.title', '=', category)
    .limit(count)
    .offset(page * count - count);

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
