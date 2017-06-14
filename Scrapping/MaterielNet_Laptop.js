// Aller récupérer le contenu de la page mise en paramètre
// Utiliser un User-Agent custom
// Trier les informations reçues
// (Optionnal) Les stocker en JSON dans /data

const Scrape = require('./class/Scrape');
const sanitizer = require('./utils/SanitizerUtil');
const strman = require('strman');
const mapLimit = require('async/mapLimit');

class MaterielNet_Laptop extends Scrape {
  static MAIN_SPECS_PREFIX() { return 'main-specs' };

  constructor(url) {
    super();

    this.scrappedProducts = {};
    this.batchSize = 3;

    this.startScrapping(url);
  }

  startScrapping(url) {
    const $ = this.fetchHTMLCheerio(url)
      .then($ => {
        this.prepareScrapeProduct($);
      });
  }

  async prepareScrapeProduct($) {
    const productLinks = await this.retrieveProductLinks($);

    this.section = '';
    this.currentTDsList;

    mapLimit(productLinks, this.batchSize, (url, callback) => {
      this.notifyFetching(url);

      this.fetchHTMLCheerio(url)
        .then($ => {
          this.scrapeSingleProduct($);
          callback();
        });
    }, () => {
      this.notifyFetchingDone();
    });
  }

  scrapeSingleProduct(html) {
    this._preScrapeSingleProduct(html);

    const data = {
      price: this._getSpecificFieldValueFromTRs('price', MaterielNet_Laptop.MAIN_SPECS_PREFIX()),
      brand: this._getSpecificFieldValueFromTRs('brand', MaterielNet_Laptop.MAIN_SPECS_PREFIX()),
      name: this._getSpecificFieldValueFromTRs('name', MaterielNet_Laptop.MAIN_SPECS_PREFIX()),
      promotion_percent: this._getSpecificFieldValueFromTRs('promotion_percent', MaterielNet_Laptop.MAIN_SPECS_PREFIX()),
      promotion_value: this._getSpecificFieldValueFromTRs('promotion_value', MaterielNet_Laptop.MAIN_SPECS_PREFIX()),
      special_operation: this._getSpecificFieldValueFromTRs('special_operation', MaterielNet_Laptop.MAIN_SPECS_PREFIX()),

      processor: this._getSpecificFieldValueFromTRs('Modèle', 'PROCESSEUR ET CHIPSET'),
      core_nb: this._getSpecificFieldValueFromTRs('Nombre de curs', 'PROCESSEUR ET CHIPSET'),
      frequency: this._getSpecificFieldValueFromTRs('Fréquence réelle', 'PROCESSEUR ET CHIPSET'),
      turbo_mode: this._getSpecificFieldValueFromTRs('Mode Turbo', 'PROCESSEUR ET CHIPSET'),

      ram: this._getSpecificFieldValueFromTRs('Capacité mémoire', 'MÉMOIRE'),
      ram_bars_number: this._getSpecificFieldValueFromTRs('Barrette(s) installée(s)', 'MÉMOIRE'),
      ram_bars_still_free: this._getSpecificFieldValueFromTRs('Emplacement(s) libre(s) disponible(s)', 'MÉMOIRE'),
      ram_type: this._getSpecificFieldValueFromTRs('Type', 'MÉMOIRE'),
      ram_frequency: this._getSpecificFieldValueFromTRs('Fréquence', 'MÉMOIRE'),
      ram_maximum: this._getSpecificFieldValueFromTRs('Maximum', 'MÉMOIRE'),

      screen_size: this._getSpecificFieldValueFromTRs('Écran', 'AFFICHAGE'),
      touch_screen: this._getSpecificFieldValueFromTRs('Tactile', 'AFFICHAGE'),
      screen_resolution: this._getSpecificFieldValueFromTRs('Résolution', 'AFFICHAGE'),
      screen_type: this._getSpecificFieldValueFromTRs('Dalle', 'AFFICHAGE'),
      screen_aspect: this._getSpecificFieldValueFromTRs('Aspect de la dalle', 'AFFICHAGE'),
      graphic_card_chipset: this._getSpecificFieldValueFromTRs('Carte graphique', 'AFFICHAGE'),
      graphic_memory_type: this._getSpecificFieldValueFromTRs('Type GDDR', 'AFFICHAGE'),
      graphic_max_memory: this._getSpecificFieldValueFromTRs('Mémoire totale', 'AFFICHAGE'),

      storage_capacity: this._getSpecificFieldValueFromTRs('Espace disque total', 'STOCKAGE'),
      storage_unit_amount: this._getSpecificFieldValueFromTRs('Nombre d\'unité de stockage', 'STOCKAGE'),
      storage_type: this._getSpecificFieldValueFromTRs('Type Stockage', 'STOCKAGE'),

      optical_disc_drive: this._getSpecificFieldValueFromTRs('Lecteur optique', 'STOCKAGE OPTIQUE'),

      keyboard: this._getSpecificFieldValueFromTRs('Clavier', 'PÉRIPHÉRIQUES INTÉGRÉS'),
      memory_card_reader: this._getSpecificFieldValueFromTRs('Lecteur carte(s) mémoire(s)', 'PÉRIPHÉRIQUES INTÉGRÉS'),
      bluetooth: this._getSpecificFieldValueFromTRs('Bluetooth', 'PÉRIPHÉRIQUES INTÉGRÉS'),
      touchpad: this._getSpecificFieldValueFromTRs('Touchpad', 'PÉRIPHÉRIQUES INTÉGRÉS'),
      numpad: this._getSpecificFieldValueFromTRs('Pavé numérique', 'PÉRIPHÉRIQUES INTÉGRÉS'),
      webcam: this._getSpecificFieldValueFromTRs('Webcam', 'PÉRIPHÉRIQUES INTÉGRÉS'),

      usb_ports: this._getSpecificFieldValueFromTRs('USB', 'CONNECTIQUE'),
      hdmi_port: this._getSpecificFieldValueFromTRs('HDMI', 'CONNECTIQUE'),
      displayport_port: this._getSpecificFieldValueFromTRs('DisplayPort', 'CONNECTIQUE'),
      rj45_port: this._getSpecificFieldValueFromTRs('RJ 45', 'CONNECTIQUE'),

      battery_type: this._getSpecificFieldValueFromTRs('Type', 'BATTERIE'),
      battery_capacity: this._getSpecificFieldValueFromTRs('Capacité', 'BATTERIE'),
      battery_approximate_autonomy: this._getSpecificFieldValueFromTRs('Autonomie approx.', 'BATTERIE'),

      case_material: this._getSpecificFieldValueFromTRs('Matière', 'BOÎTIER'),
      case_main_color: this._getSpecificFieldValueFromTRs('Couleur dominante', 'BOÎTIER'),
      case_size: this._getSpecificFieldValueFromTRs('Dimensions', 'BOÎTIER'),
      weight: this._getSpecificFieldValueFromTRs('Poids en Kg', 'BOÎTIER'),

      OS: this._getSpecificFieldValueFromTRs('Version système d\'exploitation', 'LOGICIELS'),

      warranty: this._getSpecificFieldValueFromTRs('Garantie (hors accessoires)', 'GARANTIE'),

      recommended_usage: this._getSpecificFieldValueFromTRs('Utilisation recommandée', 'USAGE'),
    };

    this.notifyScrappingDone(data);
  };

  retrieveProductLinks($) {
    let links = [];

    $('.Desc td > a').each((index, el) => {
      links.push($(el).attr('href'));
    });

    return links;
  }

  /**
   * 
   * @param {String[]} TRs 
   * 
   * Get the content of the Spec table.
   */
  getSpecTableContent(TRs) {
    for (var i = 0; i < TRs.length; i++) {
      let TDs = this._getTDsFromChildren(TRs[i].children);

      TDs = this._sanitizeTDsList(TDs);

      if (0 >= TDs.length) {
        continue;
      }

      // Let's add the section to the couple
      this._pushToCurrentTDsList(TDs[0], TDs[1]);
    }
  }

  /**
   * 
   * @param {Cheerio} html 
   * 
   * Get all the page informations in once, 
   * then the scrapping step won't have to parse the whole document every field.
   * 
   * Because we love the planet <3
   */
  _preScrapeSingleProduct(html) {
    const TRs = html('#ProdSectionDesc').find('tr');

    this.getMainSpecs(html);
    this.getSpecTableContent(TRs);
  }

  /**
   * 
   * @param {Object[]} children 
   * 
   * Returns the HTML tag's value no matter if it's a text or a <b>.
   * Could be enhanced to support more tags
   */
  _getTDContent(children) {
    const self = this;
    return children.reduce((result, child) => {
      if ('text' == child.type) {
        if (this._isUselessTextTag(child)) {
          return result;
        }

        result = strman.collapseWhitespace(child.data);
      } else if ('b' == child.name) {
        result = strman.collapseWhitespace(child.children[0].data);
      }

      return result;
    }, []);
  }

  /**
   * 
   * @param {String} field 
   * @param {String} parent 
   * 
   * In one hand we have a bunch of data previously extracted from the page.
   * In the other hand, we have a cute tinny field we wan't to retrieve data from.
   * 
   * This function does magic and give you this precious data.
   */
  _getSpecificFieldValueFromTRs(field, parent) {
    const normalizedField = strman.slugify(field);
    const normalizedParent = strman.slugify(parent);

    return this.currentTDsList[normalizedParent + '_' + normalizedField];
  }

  /**
   * 
   * @param {Object} tag 
   * 
   * Tell if a tag (<h1>...</h1>, <b>...</b>) is useless or not.
   * Sometime a tag is only a useless "\n" so we want to avoir do keep it.
   */
  _isUselessTextTag(tag) {
    if (null != tag.next || null != tag.prev) {
      return true;
    }

    return false;
  }

  /**
   * 
   * @param {Object[]} TRChildren 
   * 
   * @returns {Object[]} newChildren
   * 
   * Get all TDs from a TR, avoiding to keep Sections for instance
   */
  _getTDsFromChildren(TRChildren) {
    let newChildren = [];
    for (var i = 0; i < TRChildren.length; i++) {
      if ('td' != TRChildren[i].name) {
        continue;
      }
      const child = TRChildren[i];
      const attributes = child.attribs;

      if ('ProdSection' === attributes['class']) {
        this.section = strman.slugify(child.children[2].children[0].data);
        continue;
      }

      newChildren.push(this._getTDContent(child.children).toString());
    }

    return newChildren;
  }

  /**
   * 
   * @param {String} key 
   * @param {String} value 
   * 
   * Push an entry with `parent_key: value` in the class variable we use to 
   * cache the specs data.
   */
  _pushToCurrentTDsList(key, value) {
    this.currentTDsList[key.toString()] = value.toString();
  }

  /**
   * @param {Cheerio} html
   * 
   * Get the content of the main specs section.
   */
  getMainSpecs(html) {
    this.currentTDsList = {};
    const data = this.scrapeIt.scrapeHTML(html, {
      mainSpecs: {
        listItem: '#prod',
        data: {
          brand: {
            selector: '#ProdTitle > a > span',
          },
          name: {
            selector: '#ProdTitle span',
            eq: 1,
          },
          price: {
            selector: '.cartouche-produit #ProdInfoPrice > span',
          },
          promotion_percent: {
            selector: '.cartouche-produit #PresImg #vignettes .valeur',
            convert: x => x.replace('-', '').replace('%', '').trim(),
          },
          promotion_value: {
            selector: '.cartouche-produit #PresImg #vignettes .conversion',
            convert: x => sanitizer.removeLeft(
              x.toString().replace('€', ''),
              '-'
            ).trim(),
          },
          special_operation: {
            selector: '.specOps',
          },
        },
      },
    });

    Object.keys(data.mainSpecs[0]).forEach(x => {
      this._pushToCurrentTDsList(MaterielNet_Laptop.MAIN_SPECS_PREFIX() + '_' + x, data.mainSpecs[0][x]);
    });
  }

  /**
   * 
   * @param {String[]} TDs 
   * 
   * Add the section name to the key name after slugyfication.
   */
  _sanitizeTDsList(TDs) {
    if (0 < TDs.length) {
      TDs[0] = (strman.slugify(this.section) + '_' + strman.slugify(TDs[0]));
    }

    return TDs;
  }
}

module.exports = MaterielNet_Laptop;
