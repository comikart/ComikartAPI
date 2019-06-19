const isEmail = str =>
  /.{4,}@(hotmail|yahoo|gmail|protonmail|email)\.com/.test(str);

const isPassword = str =>
  str.length > 8 && /[A-Z]{1,}/g.test(str) && /[0-9]/g.test(str);

const isMatch = (passwordOne, passowrdTwo) => passwordOne === passowrdTwo;

const validateForm = (req, res, next) => {
  const { user } = req.body;
  isEmail(user.email) &&
  isPassword(user.password) &&
  isMatch(user.password, user.passwordTwo)
    ? next()
    : res.status(400).json({
        error:
          'password requires at least one capitalized character, length greater than 8 characters, and at least one number.',
      });
};

module.exports = {
  validateForm,
  isEmail,
  isPassword,
  isMatch,
};
