const express = require('express');
const router = express.Router();

router.get('/privacy', (req, res) => {
  res.render('privacy', { title: 'Privacy Policy — Pravesh Mitra' });
});

module.exports = router;
