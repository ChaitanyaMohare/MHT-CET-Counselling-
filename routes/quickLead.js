const express = require('express');
const router = express.Router();
const { postQuickLead } = require('../controllers/quickLeadController');

router.post('/quick-lead', postQuickLead);

module.exports = router;
