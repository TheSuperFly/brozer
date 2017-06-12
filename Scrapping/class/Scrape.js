// X Aller récupérer le contenu de la page mise en paramètre
// Utiliser un User-Agent custom
// X Trier les informations reçues
const cli = require('cli');

class Scrape {
  constructor() {
    this.scrapeIt = require('scrape-it');
    this.cheerio = require('cheerio');
    this.fetch = require('node-fetch');

    this.scrapeResult = [];
  }

  async fetchHTMLCheerio(link) {
    let response = await this.fetch(link);

    return await response.text().then(res => {
      return this.cheerio.load(res);
    });
  }

  notifyFetching(url) {
    cli.info(`Fetching ${url}`);
  }

  notifyFetchingDone() {
    cli.ok('Finished retrieving all pages. Congratz Mr. Robot!');
  }

  notifyScrappingDone(data) {
    this.scrapeResult.push(data);
  }
}

module.exports = Scrape;
