// X Aller récupérer le contenu de la page mise en paramètre
// X Trier les informations reçues
// Utiliser un User-Agent custom
const cli = require('cli');

class Scrape {
  constructor(callback) {
    this.scrapeIt = require('scrape-it');
    this.cheerio = require('cheerio');
    this.fetch = require('node-fetch');

    this.callback = callback;

    this.scrapeResult = [];
  }

  async fetchHTMLCheerio(link) {
    this.notifyFetching(link);

    let response = await this.fetch(link);

    return await response.text().then(res => {
      return this.cheerio.load(res);
    });
  }

  notifyFetching(url) {
    cli.info(`Fetching ${url}`);
  }

  notifyFetchingDone() {
    cli.ok('Finished retrieving all pages.');
  }

  notifyScrappingDone(data) {
    cli.ok('Scrapping done. Congratz Mr. Robot!');

    this.callback(data);
  }
}

module.exports = Scrape;
