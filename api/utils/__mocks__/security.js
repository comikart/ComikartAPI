const authenticate = (req, res, next) => {
  req.body.token = '13bug2763276f326vg1';
  next();
};

module.exports = {
  authenticate
};
