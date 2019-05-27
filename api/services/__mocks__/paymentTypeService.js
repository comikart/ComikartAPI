const paymentType = [
  {
    id: 1,
    title: 'credit',
  },
  {
    id: 2,
    title: 'debit',
  },
];

const findAllPaymentTypes = () =>
  new Promise((resolve, reject) => {
    resolve(paymentType);
  });

const findPaymentTypeById = id =>
  new Promise((resolve, reject) => {
    id === 1
      ? resolve(paymentType[0])
      : id === 2
      ? resolve(paymentType[1])
      : typeof id === "number"
      ? resolve([])
      : reject('Invalid ID was passed');
  });
