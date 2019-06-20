const bcrypt = require('bcrypt');
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

const encryptPwd = user =>
  new Promise((resolve, reject) => {
    bcrypt.hash(user.password, SALT_ROUNDS, (err, hash) => {
      err && reject(err);
      user.password = hash;
      resolve(user);
    });
  });

const verifyPwd = (password, hash) =>
  new Promise((resolve, reject) =>
    bcrypt.compare(password, hash, (err, result) => {
      err && reject(err);
      resolve(result);
    }),
  );

module.exports = {
  encryptPwd,
  verifyPwd,
};
