module.exports.checkQuestionData = {
    text: {
        in: 'body',
        notEmpty: true,
        errorMessage: 'Invalid text',
    },
    priority: {
        in: 'body',
        notEmpty: true,
        errorMessage: 'Invalid priority',
    },
};
