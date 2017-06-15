#!/bin/node
const cli = require('cli');
const ScrapeDispatcher = require('../Scrapping');

cli.parse({
  product: ['p', 'Scrape product', true, false],
  source: ['s', 'Scrape data source', true, false],
  gpu: ['g', 'Scrape gpu specs', true, false],
  cpu: ['c', 'Scrape cpu specs', true, false],
});

const args = process.argv.slice(2);

if (args.indexOf('-p') !== -1) {
  const scrape = new ScrapeDispatcher();

  scrape.scrapeProducts();
}

if (args.indexOf('-s') !== -1) {
  const scrape = new ScrapeDispatcher();

  scrape.scrapeSources();
}

if (args.indexOf('-g') !== -1) {
  const scrape = new ScrapeDispatcher();

  scrape.scrapeGPUSpecs();
}

if (args.indexOf('-c') !== -1) {
  const scrape = new ScrapeDispatcher();

  scrape.scrapeCPUSpecs();
}

if (!args.length) {
  const scrape = new ScrapeDispatcher();

  scrape.scrapeAll();
}
