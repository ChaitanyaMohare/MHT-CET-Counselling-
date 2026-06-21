const express = require('express');
const router = express.Router();
const { getMainForm, postMainForm, getThankYou } = require('../controllers/mainFormController');

router.get('/main-form', getMainForm);
router.post('/main-form', postMainForm);
router.get('/thankyou', getThankYou);

module.exports = router;
