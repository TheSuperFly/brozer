const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// In exemple
// {
//     text: 'Allez vous bien?',
//     priority: 5,
//     conditions: {
//       gpu: {
//         gte: 0.6,
//       },
//       cpu: {
//         lte: 0.8,
//       },
//     },
//     answers: [
//       {
//         text: 'Oui',
//         productScoreInfluence: {
//           storage: 0.2,
//           weight: 0.2,
//         },
//         questionScoreInfluence: {
//           storage: 0.7,
//           weight: 0.8,
//         },
//         nextQuestions: [
//           1, 2, 4
//         ]
//       },
//       {
//         text: 'Non',
//         productScoreInfluence: {
//           storage: 0.7,
//           weight: 0.8,
//         },
//         questionScoreInfluence: {
//           storage: 0.7,
//           weight: 0.8,
//         },
//         nextQuestions: [
//           1, 2, 4
//         ]
//       },
//     ]
//   }

const QuestionSchema = new Schema({
  text: String,
  priority: { type: String, default: 0 },
  conditions: getConditions(),
  answers: [
    {
      text: String,
      productScoreInfluence: getTypesItems(),
      questionScoreInfluence: getTypesItems(),
      nextQuestion: Array
    }
  ]
});

function getItems() {
  return [
    'gpu',
    'cpu',
    'ram',
    'autonomy',
    'storage',
    'storageType',
    'weight',
  ]
}

function getTypesItems() {
  const result = {};

  getItems().forEach(item => {
    result[item] = Number;
  });

  return result;
}

function getConditions() {
  const result = {};

  getItems().forEach(item => {
    result[item] = getConditionContent()
  });

  return result;
}

function getConditionContent() {
  return {
    gte: Number,
    lte: Number,
  }
}

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
