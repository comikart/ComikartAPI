const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { findUserByEmail } = require('../services/userService');
const { verifyPwd } = require('./encryption');
const blackListService = require('../services/blackListService');

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
            req.body.token = jwt.sign(payload, SECRET, { expiresIn: '1d' });
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

const isAdminRoute = (url, role) => {
  const isAdminRoute = /\/api\/admin/;
  return (isAdminRoute.test(url) && role === 1) || !isAdminRoute.test(url);
};

const authorization = (req, res, next) => {
  const token = req.get('Authorization');
  blackListService
    .isBlacklisted(token)
    .then(res =>
      res ? Promise.reject('token is invalid') : verifyToken(token),
    )
    .then(decoded => {
      req.decoded = decoded;
      return isAdminRoute(req.baseUrl, decoded.role)
        ? next()
        : Promise.reject('improper authorization for this route.');
    })
    .catch(err => res.status(403).json({ err }));
};

module.exports = {
  authenticate,
  authorization,
};
