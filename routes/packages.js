const express = require('express');
const router = express.Router();
const { getPackages, selectPlan } = require('../controllers/packagesController');

router.get('/packages', getPackages);
router.post('/select-plan', selectPlan);

module.exports = router;
