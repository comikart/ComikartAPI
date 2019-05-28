const service = require('../services/couponService');

const findAllCoupons = (req, res) => {
  return service
    .findAllCoupons()
    .then(coupons => res.json(coupons))
    .catch(err => res.status(500).json(err));
};

const findCouponById = (req, res) => {
  const { coupon_id } = req.params;
  return service
    .findCouponById(coupon_id)
    .then(coupon => res.json(coupon))
    .catch(err => res.status(400).json(err));
};

const findCouponByCode = (req, res) => {
  const { code } = req.body;
  return service
    .findCouponByCode(code)
    .then(coupon => res.json(coupon))
    .catch(err => res.status(400).json(err));
};

const findCouponByProductId = (req, res) => {
  const { product_id } = req.params;
  return service
    .findCouponByProductId(product_id)
    .then(coupons => res.json(coupons))
    .catch(err => res.status(400).json(err));
};

const saveCoupon = (req, res) => {
  const { coupon } = req.body;
  return service
    .saveCoupon(coupon)
    .then(() => res.status(201).json({}))
    .catch(err => res.status(400).json(err));
};

const deleteCouponById = (req, res) => {
  const { coupon_id } = req.params;
  return service
    .deleteCouponById(coupon_id)
    .then(() => res.status(204).json({}))
    .catch(err => res.status(500).json(err));
};

module.exports = {
  findAllCoupons,
  findCouponById,
  findCouponByCode,
  findCouponByProductId,
  saveCoupon,
  deleteCouponById
};
