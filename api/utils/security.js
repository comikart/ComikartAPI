const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { findUserByEmail } = require('../services/userService');
const { verifyPwd } = require('./encryption');

const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, (err, decoded) => {
      err && reject(err);
      resolve(decoded);
    });
  });

const authenticate = (req, res, next) => {
  const { email, password } = req.body;
  findUserByEmail(email)
    .then(user => {
      verifyPwd(password, user.password)
        .then(result => {
          if (result) {
            const payload = { id: user.id, role: user.role_id };
            req.body.token = jwt.sign(payload, SECRET);
            next();
          } else {
            res.status(400).json({ error: 'incorrect email or password' });
          }
        })
        .catch(err => res.status(412).json(err));
    })
    .catch(err =>
      res
        .status(400)
        .json({ error: 'no user found by the email. ' + err.message }),
    );
};

const authorization = (req, res, next) => {
  const token = req.get('Authorization');

  token
    ? verifyToken(token)
        .then(decoded => {
          req.decoded = decoded;
          const isAdminRoute = /\/api\/admin/;
          if (
            (isAdminRoute.test(req.baseUrl) && decoded.role === 1) ||
            !isAdminRoute.test(req.baseUrl)
          ) {
            next();
          } else {
            return Promise.reject('user is not an admin');
          }
        })
        .catch(err => res.status(403).json({ err }))
    : res.status(403).json({
        error: 'No token provided, must be set on the Authorization Header.',
      });
};

module.exports = {
  authenticate,
  authorization,
};
