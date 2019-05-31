const USERID = 1;
const MOVETOWISHLIST = 'MOVETOWISHLIST';
const MOVETOCART = 'MOVETOCART';

const user = {
  id: USERID,
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@email.com',
  role_id: 2
};

const wish_list = [
  { user_id: 1, product_id: 1, quantity: 1 },
  { user_id: 1, product_id: 2, quantity: 2 },
  { user_id: 1, product_id: 3, quantity: 1 }
];

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
      : reject('Invalid ID was passed');
  });

const moveItem = (enumerator, id, product_id) =>
  new Promise((resolve, reject) => {
    (enumerator === MOVETOWISHLIST || enumerator === MOVETOCART) &&
    id &&
    product_id
      ? resolve([
          { user_id: 1, product_id: 1, quantity: 1 },
          { user_id: 1, product_id: 2, quantity: 2 }
        ])
      : reject('incorrect user id or product id');
  });

const findWishListAndProductByUserId = id =>
  new Promise((resolve, reject) => {
    id === 1
      ? resolve(wish_list)
      : id !== 1 && typeof id === 'number'
      ? resolve([])
      : reject('missing param id is required');
  });

module.exports = {
  findUserByEmail,
  saveUser,
  findCartAndProductByUserId,
  moveItem,
  findWishListAndProductByUserId,
  USERID,
  MOVETOWISHLIST,
  MOVETOCART
};
