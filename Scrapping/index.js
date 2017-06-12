#!/bin/node

const cli = require('cli');
const MaterielNet_Laptop = require('./MaterielNet_Laptop');

cli.parse({
	product: [ 'p', 'Scrape product', true, false],
	source: [ 's', 'Scrape data source', true, false],
});

const args = process.argv.slice(2);

if (args.indexOf('-p') !== -1) {
  scrapeProducts();
}

if (args.indexOf('-s') !== -1) {
  scrapeSources();
}

function scrapeProducts() {
  new MaterielNet_Laptop('http://zachary.pm/mnt/localhost/index.html');
}

function scrapeSources() {
  cli.info('No sources has been scrapped.');
}