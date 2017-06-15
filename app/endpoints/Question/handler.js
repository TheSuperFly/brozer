const Question = require('../../../services/Question/class/Question');

let QuestionHandler = {};

QuestionHandler.getQuestions = (req, res) => {
  const questions = Question.getAllQuestions();

  res.render('Questions/index', {
    questions
  });
}

module.exports = QuestionHandler;