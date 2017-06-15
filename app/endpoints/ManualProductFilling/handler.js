const QuestionValidator = require('./validator');

let ManualProductFillingHandler = {};

ManualProductFillingHandler.getAddProductsForm = async (req, res) => {
  res.render(`ManualProductFilling/add`);
}

ManualProductFillingHandler.addProducts = async (req, res) => {
  console.log(req.body.urls.split("\r\n"));

  res.redirect('/debug');
}

module.exports = ManualProductFillingHandler;
