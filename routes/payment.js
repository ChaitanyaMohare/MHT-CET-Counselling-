const express = require('express');
const router = express.Router();
const { getPayment, paymentSuccess, cashfreeWebhook } = require('../controllers/paymentController');

router.get('/payment', getPayment);
router.post('/payment-success', paymentSuccess);
router.post('/cashfree-webhook', cashfreeWebhook);

module.exports = router;
