const knex = require('../../db/knex');

const findAllCoupons = () => knex('coupon').select();

const findCouponById = id => knex('coupon').where({ id });

const findCouponByCode = code => knex('coupon').where({ code });

const findCouponByProductId = product_id =>
  knex('coupon').where({ product_id });

const saveCoupon = coupon =>
  knex('coupon')
    .insert(coupon)
    .then(ret => console.log(ret));

const deleteCouponById = id =>
  knex('coupon')
    .where({ id })
    .del();

module.exports = {
  findAllCoupons,
  findCouponById,
  findCouponByCode,
  findCouponByProductId,
  saveCoupon,
  deleteCouponById
};
