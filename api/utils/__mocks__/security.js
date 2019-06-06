const authenticate = (req, res, next) => {
  req.body.token = '13bug2763276f326vg1';
  next();
};

const authorization = (req, res, next) => {
  next();
};

module.exports = {
  authenticate,
  authorization
};
