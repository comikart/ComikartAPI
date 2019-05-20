const service = require('../services/reviewService');

const findAllReviews = (req, res) => 
    service.findAllReviews()
        .then(reviews => res.json(reviews))
        .catch(err => res.status(500).json(err));

const findReviewByProductId = (req, res) => {
    const { id } = req.params;

    return service.findReviewByProductId(id)
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json(err));
}

const findReviewById = (req, res) => {
    const { id } = req.params;

    return service.findReviewById(id)
        .then(review => res.json(review))
        .catch(err => res.status(500).json(err));
}

const saveReview = (req,res) => {
    const { review } = req.body;

    service.saveReview(review)
        .then(() =>{
            service.findAllReviews()
        })
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json(err));
}

const deleteReview = (req, res) => {
    const { id } = req.params;

    service.deleteReviewById(id)
        .then(() => res.status(204).json({}))
        .catch(err => res.status(400).json(err));
}

module.exports = {
    findAllReviews,
    findReviewById,
    findReviewByProductId,
    saveReview,
    deleteReview
}