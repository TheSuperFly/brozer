const QuestionModel = require('../../../services/Question/class/model');

let QuestionHandler = {};

QuestionHandler.getQuestions = (req, res) => {
  const questions = QuestionModel.getAllQuestions();

  res.render('Questions/index', {
    questions
  });
}

module.exports = QuestionHandler;
