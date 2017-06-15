const express = require('express');
const router = express.Router();

const QuestionHandler = require('./handler');

router.get('/', QuestionHandler.getQuestions);

module.exports = router;
