const express = require('express');
const router = express.Router();
const { 
  getRegistration, 
  postRegistration, 
  getRegistrationSuccess 
} = require('../controllers/registrationController');

router.get('/register', getRegistration);
router.post('/register', postRegistration);
router.get('/registration-success', getRegistrationSuccess);

module.exports = router;
