#!/bin/node
const cli = require('cli');
const MaterielNet_Laptop = require('./MaterielNet_Laptop');
const NotebookCheck_FPS = require('./NotebookCheck_FPS');
const GPU_Benchmark = require('./GPU_Benchmark');
const CPU_Benchmark = require('./CPU_Benchmark');

cli.parse({
	product: [ 'p', 'Scrape product', true, false],
	source: [ 's', 'Scrape data source', true, false],
	gpu: [ 'g', 'Scrape gpu specs', true, false],
	cpu: [ 'c', 'Scrape cpu specs', true, false],
});

const args = process.argv.slice(2);

if (args.indexOf('-p') !== -1) {
  scrapeProducts();
}

if (args.indexOf('-s') !== -1) {
  scrapeSources();
}

if( args.indexOf('-g') !== -1) {
  scrapeGPUSpecs();
}

if (args.indexOf('-c') !== -1) {
  scrapeCPUSpecs();
}

if (args.length <= 0) {
  scrapeProducts();
  scrapeSources();
  scrapeGPUSpecs();
  scrapeCPUSpecs();
}

function scrapeProducts() {
  new MaterielNet_Laptop('http://zachary.pm/mnt/localhost/index.html');
}

function scrapeSources() {
  // https://www.notebookcheck.net/Computer-Games-on-Laptop-Graphics-Cards.13849.0.html?type=&sort=&archive=1&or=0&gameselect%5B%5D=464&gameselect%5B%5D=460&gameselect%5B%5D=448&gameselect%5B%5D=444&gameselect%5B%5D=434&gameselect%5B%5D=430&gameselect%5B%5D=424&gameselect%5B%5D=420&gameselect%5B%5D=414&gameselect%5B%5D=411&gameselect%5B%5D=409&gameselect%5B%5D=405&gameselect%5B%5D=407&gameselect%5B%5D=402&gameselect%5B%5D=398&gameselect%5B%5D=396&gameselect%5B%5D=386&gameselect%5B%5D=384&gameselect%5B%5D=377&gameselect%5B%5D=375&gameselect%5B%5D=371&gameselect%5B%5D=366&gameselect%5B%5D=361&gameselect%5B%5D=359&gameselect%5B%5D=332&gameselect%5B%5D=329&gameselect%5B%5D=299&gameselect%5B%5D=293&gameselect%5B%5D=265&gameselect%5B%5D=162&gameselect%5B%5D=112&gameselect%5B%5D=49&gameselect%5B%5D=53&gpu_fullname=1
  new NotebookCheck_FPS('http://zachary.pm/mnt/fps.html');
}

function scrapeGPUSpecs() {
  new GPU_Benchmark('http://www.videocardbenchmark.net/GPU_mega_page.html');
}

function scrapeCPUSpecs() {
  new CPU_Benchmark('http://www.cpubenchmark.net/CPU_mega_page.html');
}
