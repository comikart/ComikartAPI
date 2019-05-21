const service = require('../services/reviewService');

const findAllReviews = (req, res) => 
    service.findAllReviews()
        .then(reviews => res.json(reviews))
        .catch(err => res.status(500).json(err));

const findReviewByProductId = (req, res) => {
    const { product_id } = req.params;

    return service.findReviewByProductId(product_id)
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json(err));
}

const findReviewById = (req, res) => {
    const { review_id } = req.params;

    return Promise.all([service.findReviewById(review_id), 
                        service.findAllCommentsByReviewId(review_id),
                        service.countHelpfulByReviewId(review_id)])
        .then(arr => {
            const review = Object.assign({}, arr[0], {comments: arr[1]}, {likes: arr[2].count});
            res.json(review);
        })
        .catch(err => res.status(500).json(err));
}

const saveReview = (req,res) => {
    const { review } = req.body;
    const { product_id } = req.params;

    if (!review.product_id) {
        review.product_id = product_id;
    }

    service.saveReview(review)
        .then(() => service.findReviewByProductId(product_id))
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json(err));
}

const deleteReview = (req, res) => {
    const { review_id } = req.params;

    service.deleteReviewById(review_id)
        .then(() => res.status(204).json({}))
        .catch(err => res.status(400).json(err));
}

const findAllCommentsByReviewId = (req, res) => {
    const { review_id } = req.params;

    service.findAllCommentsByReviewId(review_id)
    .then(comments => res.json(comments));
}

module.exports = {
    findAllReviews,
    findReviewById,
    findReviewByProductId,
    saveReview,
    deleteReview,
    findAllCommentsByReviewId,
}