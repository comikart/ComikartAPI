const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = process.env.SECRET;
const SALT_ROUNDS = process.env.SALT_ROUNDS;
const { findUserByEmail } = require('../services/userService'); 


const encryptPwd = (user) => 
    new Promise((resolve, reject) => {
        bcrypt.hash(user.password, SALT_ROUNDS, (err, hash) => {
            err && reject(err);
            user.password = hash;
            resolve(user);
        })
    })

const verifyPwd = (password, userPwd) => 
    bcrypt
    .compare(password, userPwd)
    .then(result => result)
    .catch(err => err);


const verifyToken = (token) => 
    new Promise((resolve, reject) => {
        jwt.verify(token, SECRET, (err, decoded) => {
            err && reject(err);
            resolve(decoded);
        })
    });

const authenticate = (req, res, next) => {
    const { email, password } = req.body;
    const user = findUserByEmail(email);
    
    verifyPwd(password, user.password) && next();
}

const authorization = (req, res, next) => {
    const token = req.get('Authorization');

    token 
    ? verifyToken(token)
        .then(() => next())
        .catch(err => res.status(403).json({error: 'expired or invalid token.'})) 
    : res
        .status(403)
        .json({error: 'No token provided, must be set on the Authorization Header.'});
}

module.exports = {
    authorization,
    authenticate,
    encryptPwd
};