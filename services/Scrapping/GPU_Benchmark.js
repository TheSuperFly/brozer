const Scrape = require('./class/Scrape');

class GPU_Benchmark extends Scrape {
  constructor(url) {
    super();

    this.fetchHTMLCheerio(url)
      .then($ => this.scrape($));
  }

  async scrape(html) {
    await this._populateGPUSpecs(html);

    this.notifyScrappingDone(this.gpuSpecs);
  }

  _populateGPUSpecs(html) {
    this.gpuSpecs = this.scrapeIt.scrapeHTML(html, {
      gpus: {
        listItem: '#cputable > tbody > tr:not(.tablesorter-childRow)',
        data: {
          name: { selector: 'td:nth-child(1) > a' },
          price: { selector: 'td:nth-child(2) > a' },
          g3dMark: { selector: 'td:nth-child(3)' },
          g2dMark: { selector: 'td:nth-child(5)' },
          videoCardValue: { selector: 'td:nth-child(4) > a' },
          tdp: { selector: 'td:nth-child(6)' },
          powerPerformance: { selector: 'td:nth-child(7)' },
          testDate: { selector: 'td:nth-child(8)' },
          category: { selector: 'td:nth-child(9)' },
        }
      }
    });
  }
}

module.exports = GPU_Benchmark;
