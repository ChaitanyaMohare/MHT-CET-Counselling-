const express = require('express');
const router = express.Router();
const { getBasicInfo, postBasicInfo } = require('../controllers/basicInfoController');

router.get('/basic-info', getBasicInfo);
router.post('/basic-info', postBasicInfo);

module.exports = router;
