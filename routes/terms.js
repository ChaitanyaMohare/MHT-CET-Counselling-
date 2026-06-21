const express = require('express');
const router = express.Router();

router.get('/terms', (req, res) => {
  res.render('terms', { title: 'Terms & Conditions — MHT-CET Counselling' });
});

module.exports = router;
