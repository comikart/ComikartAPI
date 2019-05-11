const { authenticate } = require('../utils/middlewares');
const { user } = require('../controllers/user');

module.exports = server => {
  server.use('/api/user', user);
};