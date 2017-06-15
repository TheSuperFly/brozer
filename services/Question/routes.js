const express = require('express');
const router = express.Router();

const QuestionController = require('./QuestionController');

router.get('/', QuestionController.getQuestions);

module.exports = router;
