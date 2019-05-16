const knex = require('../../db/knex');

const findAllProducts = () => knex('product').select();

const findProductById = (id) => knex('product').select().where({id}).first();

const findProductByCategory = (category) => knex
                                            .from('product')
                                            .innerJoin('category', 'product.category_id', 'category.id')
                                            .where({'category.description': category});

