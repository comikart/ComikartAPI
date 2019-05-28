const service = require('../services/reviewService');

const findAllReviews = (req, res) =>
  service
    .findAllReviews()
    .then(reviews => res.json(reviews))
    .catch(err => res.status(500).json(err));

const findReviewByProductId = (req, res) => {
  const { product_id } = req.params;

  return service
    .findReviewByProductId(product_id)
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json(err));
};

const findReviewById = (req, res) => {
  const { review_id } = req.params;

  return Promise.all([
    service.findReviewAndHelpfulById(review_id),
    service.findAllCommentsByReviewId(review_id)
  ])
    .then(arr => {
      const review = Object.assign({}, arr[0].rows[0], { comments: arr[1] });
      return res.json(review);
    })
    .catch(err => res.status(500).json(err));
};

const saveReview = (req, res) => {
  const { review } = req.body;
  const { product_id } = req.params;

  if (!review) {
    return res.status(400).json({ message: 'review object is missing' });
  }

  review.product_id = product_id;

  return service
    .saveReview(review)
    .then(() => service.findReviewByProductId(product_id))
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json(err));
};

const deleteReview = (req, res) => {
  const { review_id } = req.params;

  return service
    .deleteReviewById(review_id)
    .then(() => res.status(204).json({}))
    .catch(err => res.status(400).json(err));
};

const findAllCommentsByReviewId = (req, res) => {
  const { review_id } = req.params;

  return service
    .findAllCommentsByReviewId(review_id)
    .then(comments => res.json(comments));
};

const saveComment = (req, res) => {
  const { comment } = req.body;
  const { review_id } = req.params;

  comment.review_id = review_id;

  return service
    .saveComment(comment)
    .then(() => service.findAllCommentsByReviewId(review_id))
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json(err));
};

const deleteComment = (req, res) => {
  const { comment_id } = req.params;

  return service
    .deleteCommentById(comment_id)
    .then(() => res.status(204).json({}))
    .catch(err => res.status(400).json(err));
};

const saveHelpful = (req, res) => {
  const { helpful } = req.body;
  const { review_id } = req.params;

  helpful.review_id = review_id;

  return service
    .saveHelpful(helpful)
    .then(() => service.findReviewAndHelpfulById(review_id))
    .then(({ rows }) => res.status(201).json(rows[0]))
    .catch(err => res.status(400).json(err));
};

module.exports = {
  findAllReviews,
  findReviewById,
  findReviewByProductId,
  saveReview,
  deleteReview,
  findAllCommentsByReviewId,
  saveComment,
  deleteComment,
  saveHelpful
};
