const Question = require('../schema');

class QuestionModel {
  static async getAllQuestions() {
    return await Question.find()
  }  

  static createQuestionFromRequest(body) {
    return new Question({
      text: body.text.trim(),
    });
  }
}

module.exports = QuestionModel;
