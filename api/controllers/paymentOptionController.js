const router = require('express').Router();
const service = require('../services/paymentOptionService');

router
  .route('/:id/paymentoption/')
  .get((req, res) => {
    const { id } = req.params;

    return service
      .findAllPaymentOptionByUser(id)
      .then(paymentOptions => res.status(200).json(paymentOptions))
      .catch(err => res.status(400).json(err));
  })
  .post((req, res) => {
    const { paymentOption } = req.body;
    const { id } = req.params;

    return service
      .savePaymentOption(paymentOption, id)
      .then(() => service.findAllPaymentOptionByUser(id))
      .then(paymentOptions => res.status(201).json(paymentOptions))
      .catch(err => res.status(400).json(err));
  });

router
  .route('/:id/paymentoption/:paymentoption_id')
  .get((req, res) => {
    const { paymentoption_id } = req.params;

    return service
      .findPaymentOptionById(paymentoption_id)
      .then(paymentOption => res.status(200).json(paymentOption))
      .catch(err => res.status(400).json(err));
  })
  .put((req, res) => {
    const { paymentOption } = req.body;
    const { id, paymentoption_id } = req.params;

    return service
      .updatePaymentOption(paymentOption, paymentoption_id)
      .then(() => service.findAllPaymentOptionByUser(id))
      .then(paymentOptions => res.status(200).json(paymentOptions))
      .catch(err => res.status(400).json(err));
  })
  .delete((req, res) => {
    const { paymentOption } = req.body;
    const { id } = req.params;

    return service
      .deletePaymentOption(paymentOption)
      .then(() => service.findAllPaymentOptionByUser(id))
      .then(paymentOptions => res.status(200).json(paymentOptions))
      .catch(err => res.status(400).json(err));
  })
  .delete((req, res) => {
    const { id, paymentoption_id } = req.params;

    return service
      .deletePaymentOptionById(paymentoption_id)
      .then(() => service.findAllPaymentOptionByUser(id))
      .then(paymentOptions => res.status(200).json(paymentOptions))
      .catch(err => res.status(400).json(err));
  });

module.exports = router;
