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
        this.scrapeProductList($);
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

  scrapeProductList(html) {
    const data = this.scrapeIt.scrapeHTML(html, {
      products: {
        listItem: '.ProdListL1',
        data: {
          brand: {
            selector: '.Desc .brand'
          },
          name: {
            selector: '.Desc .nomProduit',
            convert: x => strman.collapseWhitespace(sanitizer.removeRight(x, ' - '))
          },
          price: {
            selector: '.Price .prix',
            convert: x => sanitizer.deviseToFloat(x),
          },
          specialPrice: {
            selector: '.Desc .prixReduit'
          },
          technicalDetails: {
            selector: '.Carac',
            convert: this.scrapeTechnicalDetails
          },
          promotionnalText: {
            selector: '.Desc .prixReduit'
          },
          productLink: {
            selector: '.Desc td > a',
            attr: 'href'
          }
        },
      }
    });
  }

  preScrapeSingleProduct(html) {
    const TRs = html('#ProdSectionDesc').find('tr');

    this.getMainSpecs(html);
    this.getSpecTableContent(TRs);
  }

  scrapeSingleProduct(html) {
    this.preScrapeSingleProduct(html); 

    const data = {
      price: this.getSpecificFieldValueFromTRs('price', MaterielNet_Laptop.MAIN_SPECS_PREFIX()),
      brand: this.getSpecificFieldValueFromTRs('brand', MaterielNet_Laptop.MAIN_SPECS_PREFIX()),
      name: this.getSpecificFieldValueFromTRs('name', MaterielNet_Laptop.MAIN_SPECS_PREFIX()),
      promotion_percent: this.getSpecificFieldValueFromTRs('promotion_percent', MaterielNet_Laptop.MAIN_SPECS_PREFIX()),
      promotion_value: this.getSpecificFieldValueFromTRs('promotion_value', MaterielNet_Laptop.MAIN_SPECS_PREFIX()),
      special_operation: this.getSpecificFieldValueFromTRs('special_operation', MaterielNet_Laptop.MAIN_SPECS_PREFIX()),

      processor: this.getSpecificFieldValueFromTRs('Modèle', 'PROCESSEUR ET CHIPSET'),
      core_nb: this.getSpecificFieldValueFromTRs('Nombre de curs', 'PROCESSEUR ET CHIPSET'),
      frequency: this.getSpecificFieldValueFromTRs('Fréquence réelle', 'PROCESSEUR ET CHIPSET'),
      turbo_mode: this.getSpecificFieldValueFromTRs('Mode Turbo', 'PROCESSEUR ET CHIPSET'),

      ram: this.getSpecificFieldValueFromTRs('Capacité mémoire', 'MÉMOIRE'),
      ram_bars_number: this.getSpecificFieldValueFromTRs('Barrette(s) installée(s)', 'MÉMOIRE'),
      ram_bars_still_free: this.getSpecificFieldValueFromTRs('Emplacement(s) libre(s) disponible(s)', 'MÉMOIRE'),
      ram_type: this.getSpecificFieldValueFromTRs('Type', 'MÉMOIRE'),
      ram_frequency: this.getSpecificFieldValueFromTRs('Fréquence', 'MÉMOIRE'),
      ram_maximum: this.getSpecificFieldValueFromTRs('Maximum', 'MÉMOIRE'),

      screen_size: this.getSpecificFieldValueFromTRs('Écran', 'AFFICHAGE'),
      touch_screen: this.getSpecificFieldValueFromTRs('Tactile', 'AFFICHAGE'),
      screen_resolution: this.getSpecificFieldValueFromTRs('Résolution', 'AFFICHAGE'),
      screen_type: this.getSpecificFieldValueFromTRs('Dalle', 'AFFICHAGE'),
      screen_aspect: this.getSpecificFieldValueFromTRs('Aspect de la dalle', 'AFFICHAGE'),
      graphic_card_chipset: this.getSpecificFieldValueFromTRs('Carte graphique', 'AFFICHAGE'),
      graphic_memory_type: this.getSpecificFieldValueFromTRs('Type GDDR', 'AFFICHAGE'),
      graphic_max_memory: this.getSpecificFieldValueFromTRs('Mémoire totale', 'AFFICHAGE'),

      storage_capacity: this.getSpecificFieldValueFromTRs('Espace disque total', 'STOCKAGE'),
      storage_unit_amount: this.getSpecificFieldValueFromTRs('Nombre d\'unité de stockage', 'STOCKAGE'),
      storage_type: this.getSpecificFieldValueFromTRs('Type Stockage', 'STOCKAGE'),

      optical_disc_drive: this.getSpecificFieldValueFromTRs('Lecteur optique', 'STOCKAGE OPTIQUE'),

      keyboard: this.getSpecificFieldValueFromTRs('Clavier', 'PÉRIPHÉRIQUES INTÉGRÉS'),
      memory_card_reader: this.getSpecificFieldValueFromTRs('Lecteur carte(s) mémoire(s)', 'PÉRIPHÉRIQUES INTÉGRÉS'),
      bluetooth: this.getSpecificFieldValueFromTRs('Bluetooth', 'PÉRIPHÉRIQUES INTÉGRÉS'),
      touchpad: this.getSpecificFieldValueFromTRs('Touchpad', 'PÉRIPHÉRIQUES INTÉGRÉS'),
      numpad: this.getSpecificFieldValueFromTRs('Pavé numérique', 'PÉRIPHÉRIQUES INTÉGRÉS'),
      webcam: this.getSpecificFieldValueFromTRs('Webcam', 'PÉRIPHÉRIQUES INTÉGRÉS'),

      usb_ports: this.getSpecificFieldValueFromTRs('USB', 'CONNECTIQUE'),
      hdmi_port: this.getSpecificFieldValueFromTRs('HDMI', 'CONNECTIQUE'),
      displayport_port: this.getSpecificFieldValueFromTRs('DisplayPort', 'CONNECTIQUE'),
      rj45_port: this.getSpecificFieldValueFromTRs('RJ 45', 'CONNECTIQUE'),

      battery_type: this.getSpecificFieldValueFromTRs('Type', 'BATTERIE'),
      battery_capacity: this.getSpecificFieldValueFromTRs('Capacité', 'BATTERIE'),
      battery_approximate_autonomy: this.getSpecificFieldValueFromTRs('Autonomie approx.', 'BATTERIE'),

      case_material: this.getSpecificFieldValueFromTRs('Matière', 'BOÎTIER'),
      case_main_color: this.getSpecificFieldValueFromTRs('Couleur dominante', 'BOÎTIER'),
      case_size: this.getSpecificFieldValueFromTRs('Dimensions', 'BOÎTIER'),
      weight: this.getSpecificFieldValueFromTRs('Poids en Kg', 'BOÎTIER'),

      OS: this.getSpecificFieldValueFromTRs('Version système d\'exploitation', 'LOGICIELS'),

      warranty: this.getSpecificFieldValueFromTRs('Garantie (hors accessoires)', 'GARANTIE'),

      recommended_usage: this.getSpecificFieldValueFromTRs('Utilisation recommandée', 'USAGE'),
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
   * @param {Object[]} TRChildren 
   * 
   * @returns {Object[]} newChildren
   * 
   * Get all TDs from a TR, avoiding to keep Sections for instance
   */
  getTDsFromChildren(TRChildren) {
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

      newChildren.push(this.getTDContent(child.children).toString());
    }

    return newChildren;
  }

  /**
   * 
   * @param {Object[]} children 
   */
  getTDContent(children) {
    const self = this;
    return children.reduce((result, child) => {
      if ('text' == child.type) {
        if (this.isUselessTextTag(child)) {
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
   * @param {Object} tag 
   * 
   * Tell if a tag (<h1>...</h1>, <b>...</b>) is useless or not.
   * Sometime a tag is only a useless "\n" so we want to avoir do keep it.
   */
  isUselessTextTag(tag) {
    if (null != tag.next || null != tag.prev) {
      return true;
    }

    return false;
  }

  getSpecificFieldValueFromTRs(field, parent) {
    const normalizedField = strman.slugify(field);
    const normalizedParent = strman.slugify(parent);

    return this.currentTDsList[normalizedParent + '_' + normalizedField];
  }

  /**
   * 
   * @param {String[]} TRs 
   * 
   * Get the content of the Spec table.
   */
  getSpecTableContent(TRs) {
    for (var i = 0; i < TRs.length; i++) {
      let TDs = this.getTDsFromChildren(TRs[i].children);

      TDs = this.sanitizeTDsList(TDs);

      if (0 >= TDs.length) {
        continue;
      }

      // Let's add the section to the couple
      this._pushToCurrentTDsList(TDs[0], TDs[1]);
    }
  }

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
      this._pushToCurrentTDsList(MaterielNet_Laptop.MAIN_SPECS_PREFIX() +'_' + x, data.mainSpecs[0][x]);
    });
  }

  /**
   * 
   * @param {String[]} TDs 
   * 
   * Add the section name to the key name after slugyfication.
   */
  sanitizeTDsList(TDs) {
    if (0 < TDs.length) {
      TDs[0] = (strman.slugify(this.section) + '_' + strman.slugify(TDs[0]));
    }

    return TDs;
  }

  scrapeTechnicalDetails(x) {
    const data = x.split(', ');

    return {
      screenSize: data[0],
      cpu: data[1],
      ram: data[2],
      gpu: data[3],
      hardDrive: data[4],
      os: data[5],
      weight: data[6]
    }
  }
}

module.exports = MaterielNet_Laptop;
