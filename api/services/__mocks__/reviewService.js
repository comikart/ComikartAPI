const reviews = [
  {
    product_id: 1,
    user_id: 1,
    score: 4,
    title: 'this is a title',
    description: 'description'
  },
  {
    product_id: 1,
    user_id: 2,
    score: 3,
    title: 'this is a title',
    description: 'description'
  },
  {
    product_id: 1,
    user_id: 3,
    score: 4,
    title: 'this is a title',
    description: 'description'
  },
  {
    product_id: 1,
    user_id: 4,
    score: 2,
    title: 'this is a title',
    description: 'description'
  }
];

const findReviewByProductId = product_id =>
  new Promise((resolve, reject) => {
    product_id === 1
      ? resolve(reviews)
      : product_id !== 1 && typeof product_id === 'number'
      ? resolve([])
      : reject('required param id is missing');
  });

module.exports = {
  findReviewByProductId
};
