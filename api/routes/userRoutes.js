const { authorization, authenticate } = require('../utils/security');
const { login, register } = require('../controllers/userController');


module.exports = server => {
    server.use('/api/user/login', authenticate, login);
    server.route('/api/user/register').post(register);
};