const parallelLimit = require('async/parallelLimit');
const MaterielNet_Laptop = require('../../../services/Scrapping/MaterielNet_Laptop');
const ScrapeDispatcher = require('../../../services/Scrapping');

const QuestionValidator = require('./validator');

let ManualProductFillingHandler = {};

ManualProductFillingHandler.getAddProductsForm = async (req, res) => {
  res.render(`ManualProductFilling/add`);
}

ManualProductFillingHandler.addProducts = async (req, res) => {
  let links = req.body.urls.split("\r\n");

  links = links.filter(link => {
    if (-1 !== link.split('/').indexOf("www.materiel.net")) {
      return link;
    }
  });

  const Scrape = new ScrapeDispatcher();
  Scrape.scrapeProductsFromLinks(links, (err, result) => {
    if (err) throw new Error(err);

    
    res.send(result);
  });
}

module.exports = ManualProductFillingHandler;
