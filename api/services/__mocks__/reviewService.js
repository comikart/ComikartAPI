const reviews = [
  {
    id: 1,
    product_id: 1,
    user_id: 1,
    score: 4,
    title: 'this is a title',
    description: 'description'
  },
  {
    id: 2,
    product_id: 1,
    user_id: 2,
    score: 3,
    title: 'this is a title',
    description: 'description'
  },
  {
    id: 3,
    product_id: 1,
    user_id: 3,
    score: 4,
    title: 'this is a title',
    description: 'description'
  },
  {
    id: 4,
    product_id: 1,
    user_id: 4,
    score: 2,
    title: 'this is a title',
    description: 'description'
  }
];

const comments = [
  { id: 1, user_id: 1, review_id: 1, description: 'Hello, World' },
  { id: 2, user_id: 1, review_id: 1, description: 'second comment' },
  { id: 3, user_id: 1, review_id: 1, description: 'third comment' }
];

const findReviewByProductId = product_id =>
  new Promise((resolve, reject) => {
    product_id === 1
      ? resolve(reviews)
      : product_id !== 1 && typeof product_id === 'number'
      ? resolve([])
      : reject('required param id is missing');
  });

const findReviewAndHelpfulById = review_id =>
  new Promise((resolve, reject) => {
    const review = reviews.find(review => review.id === review_id);

    review
      ? resolve({ rows: [review] })
      : typeof review === 'number'
      ? resolve({ rows: [] })
      : reject('required param id is missing.');
  });

const findAllCommentsByReviewId = review_id =>
  new Promise((resolve, reject) => {
    if (typeof review_id !== 'number') reject('missing review id param');

    const filteredComments = comments.filter(
      comment => comment.review_id === review_id
    );

    resolve(filteredComments);
  });
module.exports = {
  findReviewByProductId,
  findReviewAndHelpfulById,
  findAllCommentsByReviewId
};
