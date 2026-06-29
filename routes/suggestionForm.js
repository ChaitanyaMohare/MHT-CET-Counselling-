const express = require('express');
const router = express.Router();
const suggestionFormController = require('../controllers/suggestionFormController');

// POST - Submit suggestion form
router.post('/api/suggestion-form', suggestionFormController.submitSuggestionForm);

module.exports = router;
