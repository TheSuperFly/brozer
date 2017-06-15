const Scrape = require('./class/Scrape');
const sanitizer = require('./utils/SanitizerUtil');
const mapLimit = require('async/mapLimit');
const gpuAttribute = require('./types/gpuAttribute');

class NotebookCheck_FPS extends Scrape {
  constructor(url, callback) {
    super(callback);

    this.gameList = [];
    this.qualityList = [];
    this.gpuList = [];
    this.fpsList = [];

    this.gameStack = [];

    this.classNameToAttribute = {
      'gpugames_field_normal_high2': gpuAttribute.GOOD,
      'gpugames_field_int_high': gpuAttribute.PROBABLY_GOOD,

      'gpugames_field_normal_high': gpuAttribute.AVERAGE,
      'gpugames_field_normal_unsure': gpuAttribute.PROBABLY_AVERAGE,
      'gpugames_field_int_unsure': gpuAttribute.PROBABLY_AVERAGE,
      'gpugames_field_int_unsure': gpuAttribute.PROBABLY_AVERAGE,

      'gpugames_field_normal_low': gpuAttribute.LOW,
      'gpugames_field_int_low': gpuAttribute.PROBABLY_LOW,
    };

    this.fetchHTMLCheerio(url)
      .then($ => this.scrape($));
  }

  async scrape(html) {
    await this.populateGameList(html);
    await this.populateQualityList(html);
    await this.populateGPUList(html);

    this.notifyScrappingDone(this.gpuList);
  }

  populateGPUList(html) {
    let gpuIndex = 0;

    this.gpuList = this.scrapeIt.scrapeHTML(html, {
      gpus: {
        listItem: '.gpuform #sortierbare_tabelle tr.odd, .gpuform #sortierbare_tabelle tr.even',
        data: {
          index: { how: () => gpuIndex++ },
          gpuChip: '.specs > a',
          fpsList: {
            selector: 'td:nth-child(n + 3)',
            how: x => {
              let fpsList = [];

              x.each((index, element) => {
                fpsList.push(this.computeFPS(index, element));
              });

              return fpsList;
            },
            convert: x => {
              return x
            }
          }
        }
      }
    });

    return this.gpuList;
  }

  populateGameList(html) {
    this.gameList = this.scrapeIt.scrapeHTML(html, {
      gameList: {
        listItem: '.gpuform tr.header',
        data: {
          singleGameList: {
            listItem: '.gpugames_header_games',
            selector: 'b'
          }
        }
      }
    }).gameList[0].singleGameList;

    this._reloadGameStack();

    return this.gameList;
  }

  populateQualityList(html) {
    let qualityIndex = 0;

    this.qualityList = this.scrapeIt.scrapeHTML(html, {
      qualityList: {
        listItem: '.gpuform tr:nth-child(2)',
        data: {
          singleQualityList: {
            listItem: 'td.gpugames_header_settings_class > a'
          }
        }
      }
    }).qualityList[0].singleQualityList;

    return this.qualityList;
  }

  computeFPS(index, element) {
    const gameShifterClass = 'gpugames_spacer';
    const currentSquareClass = this.cheerio(element).attr('class');

    if (currentSquareClass === gameShifterClass) {
      this.gameStack.shift();
      return;
    }

    const attribute = this._translateClassToAttribute(currentSquareClass);
    const game = this.gameStack[0];
    const fps = this.cheerio(element).find('div > span > span').text();

    if (this.cheerio(element).is(':last-child')) {
      this._reloadGameStack();
    }

    return {
      game,
      performances: {
        fps,
        attribute,
      }
    };
  }

  _translateClassToAttribute(className) {
    return this.classNameToAttribute[className] || gpuAttribute.UNKNOWN;
  }

  _reloadGameStack() {
    this.gameStack = this.gameList.slice(0);
  }
}

module.exports = NotebookCheck_FPS;
