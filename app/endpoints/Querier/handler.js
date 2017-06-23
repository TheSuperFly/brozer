const cli = require('cli');

const Scrapping = require('../../../services/Scrapping');
const Matcher = require('../../../services/Matcher');

const QuerierHandler = {};

QuerierHandler.getScrapThenMatch = (req, res, next) => {
  cli.info('Starting Scrapping Then Matching ...');

  const productOrigin = (req.query.source === 'materiel.net');

  const scrapping = new Scrapping(productOrigin);
  const matcher = new Matcher();

  scrapping.scrapeAll(async (err, data) => {
    if (err) throw new Error('Scrapping failed');

    const matchedData = await matcher.match(data);
    
    cli.debug('Go back to the browser.')
    res.send(matchedData);
  });
}

module.exports = QuerierHandler;
