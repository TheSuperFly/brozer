#!/bin/node
const cli = require('cli');
const util = require('util');
const Scrapping = require('../services/Scrapping');
const Matcher = require('../services/Matcher');

cli.info('Starting Scrapping ...');

const scrapping = new Scrapping();
const matcher = new Matcher();

scrapping.scrapeAll(async (err, data) => {
  if (err) throw new Error('Scrapping failed');

  const matchedData = await matcher.match(data);
  
  cli.info('Below the first scrapped & matched product.');
  console.log(util.inspect(matchedData[0], { colors: true, depth: null }));
});
