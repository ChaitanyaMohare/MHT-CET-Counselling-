const express = require('express');
const router = express.Router();
const { getContact, postContact } = require('../controllers/contactController');

router.get('/contact', getContact);
router.post('/contact', postContact);

module.exports = router;
