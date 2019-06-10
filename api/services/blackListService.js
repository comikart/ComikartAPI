const redis = require('redis');
const redis_url = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const client = redis.createClient(redis_url);
const key = 'blacklist';

client.on('connect', () => console.log('Redis connected successfully'));
client.on('error', () => console.log('Redis client didnt connect properly.'));

const blackList = token =>
  new Promise((resolve, reject) => {
    client.RPUSH(key, token, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });

const isBlacklisted = token =>
  new Promise((resolve, reject) => {
    getBlackListed().then(list =>
      resolve(list.find(item => token === item) ? true : false),
    );
  });

const getBlackListed = () =>
  new Promise((resolve, reject) => {
    client.LRANGE(key, 0, -1, (err, res) => {
      err && reject(err);

      resolve(res);
    });
  });

const clearAndAssignTokens = tokens =>
  new Promise((resolve, reject) => {
    client.DEL(key, (err, res) => {
      err && reject(err);
      tokens.length > 0 &&
        client.RPUSH(key, tokens, (err, res) => {
          err ? reject(err) : resolve(res);
        });
    });
  });

const deleteBlacklisted = items =>
  new Promise((resolve, reject) => {
    resolve(
      Array.isArray(items)
        ? items.map(item => client.LREM(key, 1, item))
        : client.LREM(key, 1, items),
    );
  });

module.exports = {
  blackList,
  isBlacklisted,
  deleteBlacklisted,
  getBlackListed,
  clearAndAssignTokens,
};
