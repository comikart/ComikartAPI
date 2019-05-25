const USERID = 1;

const user = {
  id: USERID,
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@email.com',
  role_id: 2
};

const findUserByEmail = () =>
  new Promise((resolve, reject) => {
    resolve(user);
  });

const saveUser = user =>
  new Promise((resolve, reject) => {
    user.id = USERID;

    resolve(user);
  });

const findCartAndProductByUserId = id =>
  new Promise((resolve, reject) => {
    const cart = [
      { user_id: USERID, product_id: 1, quantity: 2 },
      { user_id: USERID, product_id: 2, quantity: 2 },
      { user_id: USERID, product_id: 3, quantity: 1 }
    ];

    id === 1
      ? resolve(cart)
      : typeof id === 'number'
      ? resolve([])
      : reject('no id was passed');
  });

module.exports = {
  findUserByEmail,
  saveUser,
  findCartAndProductByUserId,
  USERID
};
