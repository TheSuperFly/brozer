const Scrape = require('./class/Scrape');

class CPU_Benchmark extends Scrape {
  constructor(url) {
    super();

    this.fetchHTMLCheerio(url)
      .then($ => this.scrape($));
  }

  async scrape(html) {
    await this._populateGPUSpecs(html);

    this.notifyScrappingDone(this.cpuSpecs);
  }

  _populateGPUSpecs(html) {
    this.cpuSpecs = this.scrapeIt.scrapeHTML(html, {
      cpus: {
        listItem: '#cputable > tbody > tr:not(.tablesorter-childRow)',
        data: {
          name: { selector: 'td:nth-child(1) > a' },
          price: { selector: 'td:nth-child(2) > a' },
          cpuMark: { selector: 'td:nth-child(3)' },
          videoCardValue: { selector: 'td:nth-child(4) > a' },
          singleThreadMark: { selector: 'td:nth-child(5)' },
          singleThreadValue: { selector: 'td:nth-child(6)' },
          tdp: { selector: 'td:nth-child(7)' },
          powerPerformance: { selector: 'td:nth-child(8)' },
          testDate: { selector: 'td:nth-child(9)' },
          socket: { selector: 'td:nth-child(10)' },
          category: { selector: 'td:nth-child(11)' },
        }
      }
    });
  }
}

module.exports = CPU_Benchmark;
