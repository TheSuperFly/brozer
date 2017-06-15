// The QuestionController

module.exports.getQuestions = async(req, res) => {
    res.render('questions/index', {
        questions: ['foo', 'bar']
    });
}
