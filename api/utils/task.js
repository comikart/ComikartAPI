const { verifyToken } = require('./security');
const service = require('../services/blackListService');

const asyncFilter = (arr, cb) => {
  const filtered = [];

  for (let i = 0; i < arr.length; i++) {
    cb(arr[i])
      .then(valid => filtered.push(arr[i]))
      .catch(invalid => invalid);
  }

  return filtered;
};

const deleteInvalidTokens = () => {
  console.log(
    'Deleting invalidated tokens.',
    new Date(Date.now()).toUTCString(),
  );

  service
    .getBlackListed()
    .then(tokens => asyncFilter(tokens, token => verifyToken(token)))
    .then(filtered => service.clearAndAssignTokens(filtered));
};

module.exports = {
  deleteInvalidTokens,
};
