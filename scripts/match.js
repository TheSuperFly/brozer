#!/bin/node
const cli = require('cli');
const Scrapping = require('../services/Scrapping');
const Matcher = require('../services/Matcher');

cli.info('Starting Scrapping ...');

const scrapping = new Scrapping();
const matcher = new Matcher();

console.time('SCRAPE');
scrapping.scrapeAll(async (err, data) => {
  if (err) throw new Error('Scrapping failed');
  console.timeEnd('SCRAPE');

  console.time('MATCH');
  const matchedData = await matcher.match(data);
  console.timeEnd('MATCH');
  
  console.log(matchedData);
});
