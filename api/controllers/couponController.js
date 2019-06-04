const service = require('../services/couponService');

// api/product/coupon
router
  .route('/coupon')
  .get((req, res) => {
    return service
      .findAllCoupons()
      .then(coupons => res.json(coupons))
      .catch(err => res.status(500).json(err));
  })

  // api/product/coupon
  .post((req, res) => {
    const { coupon } = req.body;

    return service
      .saveCoupon(coupon)
      .then(() => res.status(201).json({}))
      .catch(err => res.status(400).json(err));
  });

// api/product/coupon/:coupon_id
router
  .route('/coupon/:coupon_id')
  .get((req, res) => {
    const { coupon_id } = req.params;

    return service
      .findCouponById(coupon_id)
      .then(coupon => res.json(coupon))
      .catch(err => res.status(400).json(err));
  })

  // api/product/coupon/:coupon_id
  .delete((req, res) => {
    const { coupon_id } = req.params;

    return service
      .deleteCouponById(coupon_id)
      .then(() => res.status(204).json({}))
      .catch(err => res.status(500).json(err));
  });

// api/product/coupon/:code
router.route('/coupon/:code').get((req, res) => {
  const { code } = req.params;

  return service
    .findCouponByCode(code)
    .then(coupon => res.json(coupon))
    .catch(err => res.status(400).json(err));
});

// api/product/:product_id/coupon
router.route('/:product_id/coupon').get((req, res) => {
  const { product_id } = req.params;

  return service
    .findCouponByProductId(product_id)
    .then(coupons => res.json(coupons))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
