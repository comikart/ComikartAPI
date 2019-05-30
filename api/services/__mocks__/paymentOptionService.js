const paymentOptions = [
  {
    credit_card: 424242424242,
    billing_address: '123 whambam st',
    exp: '05/20',
    security_number: 444,
    active: false,
    user_id: 1,
    type_id: 1,
  },
  {
    credit_card: 4242424242423,
    billing_address: '424 whambam st',
    exp: '05/20',
    security_number: 444,
    active: false,
    user_id: 2,
    type_id: 2,
  },
  {
    credit_card: 324242424242,
    billing_address: '324 whambam st',
    exp: '05/20',
    security_number: 444,
    active: false,
    user_id: 3,
    type_id: 2,
  },
  {
    credit_card: 324242424242,
    billing_address: '324 whambam st',
    exp: '05/20',
    security_number: 444,
    active: false,
    user_id: 1,
    type_id: 2,
  },
];

const findAllPaymentOptionByUser = id =>
  new Promise((resolve, reject) => {
    id === 1
      ? resolve(paymentOptions.filter(option => option.user_id === 1))
      : id === 2
      ? resolve(paymentOptions.filter(option => option.user_id === 2))
      : id === 3
      ? resolve(paymentOptions.filter(option => option.user_id === 3))
      : reject('ID passed is invalid');
  });

const findPaymentOptionById = id =>
  new Promise((resolve, reject) => {
    id === 1
      ? resolve(paymentOptions[0])
      : id === 2
      ? resolve(paymentOptions[1])
      : id === 3
      ? resolve(paymentOptions[2])
      : id === 4
      ? resolve(paymentOptions[3])
      : reject('ID passed is invalid');
  });

const savePaymentOption = (paymentOption, id) =>
  new Promise((resolve, reject) => {
    if (!paymentOption || paymentOption.type_id > 2)
      reject('No payment option found');
    else {
      paymentOption.id = 5;
      paymentOption.user_id = id;
      paymentOptions.push(paymentOption);
      resolve(paymentOption);
    }
  });

const updatePaymentOption = (paymentOption, id) =>
  new Promise((resolve, reject) => {
    const index = paymentOptions.map((i, paymentObject) =>
      paymentObject.id === id ? i : false,
    );
    if (index) {
      paymentOptions.splice(index, 1, paymentOption);
      resolve(paymentOptions);
    }
    else reject("No payment option found")
  });

module.exports = {
  findAllPaymentOptionByUser,
  findPaymentOptionById,
  savePaymentOption,
  updatePaymentOption,
};
