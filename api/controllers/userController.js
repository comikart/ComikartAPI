const userService = require('../services/userService');

/**
 * @api {post} /api/user/login Request Login 
 * @apiVersion 1.0.0
 * @apiName POSTLogin
 * @apiGroup User
 *
 * @apiSuccess {object} User User profile information
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "first_name": "john",
 *       "last_name": "doe",
 *       "role_id": 2
 *     }
 *
 * @apiError IncorrectCredentials email or password is incorrect
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Client Error
 *     {
 *          "error"; "incorrect email or password"
 *     }
 */
const login = (req, res) => {
    const { token } = req.body;
    token && res.json({token});
};


/**
 * @api {post} /api/user/register Request Register 
 * @apiVersion 1.0.0
 * @apiName POSTRegister
 * @apiGroup User
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 CREATED
 *     {}
 *
 * @apiError IncorrectCredentials Email already exists. 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Client-Error
 *     {
 *          "error"; "email already exists"
 *     }
 */

const register = (req, res) => {
    const { user } = req.body;
    user.role_id = 2;
    userService.saveUser(user)
    .then(() => res.status(201).json({}))
    .catch(err => res.status(400).json({error: err.message}));
}

module.exports = {
    login,
    register
};