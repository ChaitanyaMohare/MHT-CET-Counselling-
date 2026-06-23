const express = require('express');
const router = express.Router();
const { getHome, submitInquiry } = require('../controllers/indexController');

router.get('/', getHome);
router.post('/submit-inquiry', submitInquiry);

module.exports = router;
