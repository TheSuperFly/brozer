#!/bin/node
const cli = require('cli');

const Scrapping = require('../services/Scrapping');
const Matcher = require('../services/Matcher');
const ItemProcessor = require('../services/ItemProcessor');

cli.info('Starting Item Processing ...');

const scrapping = new Scrapping();
const matcher = new Matcher();
const itemProcessor = new ItemProcessor();

console.time('SCRAPE');
scrapping.scrapeAll(async (err, data) => {
  if (err) throw new Error('Scrapping failed');
  console.timeEnd('SCRAPE');

  console.time('MATCH');
  const matchedData = await matcher.match(data);
  console.timeEnd('MATCH');
  
  console.time('ITEM_PROCESSOR');
  const proceedData = await itemProcessor.process(matchedData);
  console.timeEnd('ITEM_PROCESSOR');

  console.log(proceedData);
});
