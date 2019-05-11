const { authenticate } = require('../utils/authenticate');
const { login, register } = require('../controllers/userController');


module.exports = server => {
    server.route('/api/user/login').get(login);
    server.route('/api/user/register').get(register);
};