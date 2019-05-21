const knex = require('../../db/knex');

const findAllReviews = () => knex('review').select();

const findReviewById = (id) => knex('review').where({id}).first();

const findReviewByProductId = (product_id) => knex('review').where({product_id});

const findAllCommentsByReviewId = (review_id) => knex('comment').where({review_id});

const findCommentById = (id) => knex('comment').where({id});

const findAllHelpfulByReviewId = (review_id) => knex('helpful').where({review_id});

const countHelpfulByReviewId = (review_id) => knex('helpful').count().where({review_id}).first();

const saveReview = (review) => knex('review').insert(review);

const saveComment = (comment) => knex('comment').insert(comment);

const saveHelpful = (helpful) => knex('helpful').insert(helpful);

const deleteReviewById = (id) => knex('review').where({id}).del();

const deleteCommentById = (id) => knex('comment').where({id}).del();

const deleteHelpful = (helpful) => knex('helpful').where({helpful}).del();

module.exports = {
    findAllReviews,
    findReviewById,
    findReviewByProductId,
    findAllCommentsByReviewId,
    findCommentById,
    findAllHelpfulByReviewId,
    countHelpfulByReviewId,
    saveReview,
    saveComment,
    saveHelpful,
    deleteReviewById,
    deleteCommentById,
    deleteHelpful
}