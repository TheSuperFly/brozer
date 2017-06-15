const QuestionModel = require('../../../services/Question/class/model');
const Question = require('../../../services/Question/schema');

const QuestionValidator = require('./validator');

let QuestionHandler = {};

QuestionHandler.getQuestions = async (req, res) => {
  const questions = await QuestionModel.getAllQuestions();

  res.render('Questions/index', {
    questions
  });
}

QuestionHandler.getQuestion = async (req, res) => {
  const question = await Question.findById(req.params.id);

  res.render('Questions/single', {
    question
  });
}

QuestionHandler.createQuestionForm = async (req, res) => {
  res.render('Questions/create');
}

QuestionHandler.createQuestion = async (req, res) => {
  req.check(QuestionValidator.checkQuestionData);

  const validationResult = await req.getValidationResult();

  if (!validationResult.isEmpty()) {
    return res.render('Questions/create', {errors: validationResult.array()});
  }

  const newQuestion = QuestionModel.createQuestionFromRequest(req.body);

  const question = await newQuestion.save()

  res.redirect(`/questions/${question.id}`);
}

module.exports = QuestionHandler;
