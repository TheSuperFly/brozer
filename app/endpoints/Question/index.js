const express = require('express');
const router = express.Router();

const QuestionHandler = require('./handler');

router.get('/', QuestionHandler.getQuestions);
router.get('/create', QuestionHandler.createQuestionForm);
router.get('/:id', QuestionHandler.getQuestion);

router.post('/create', QuestionHandler.createQuestion);

module.exports = router;
