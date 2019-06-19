const router = require('express').Router();
const { authorization } = require('../utils/security');

router.use('/', authorization);

// purchase history filter by date,
// shipping history filter by date.
// clients list filter by id
// products list
// product
// reviews by product
// comments by review

router
  .route('/')
  .get((req, res) => res.json({ message: 'successfully retrieved data.' }));

module.exports = router;
