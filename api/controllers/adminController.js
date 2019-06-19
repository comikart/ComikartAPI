const router = require('express').Router();
const { authorization } = require('../utils/security');

router.use('/', authorization);
router
  .route('/')
  .get((req, res) => res.json({ message: 'successfully retrieved data.' }));

module.exports = router;
