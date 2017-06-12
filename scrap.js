
// Aller récupérer le contenu de la page mise en paramètre
// Utiliser un User-Agent custom
// Trier les informations reçues
// (Optionnal) Les stocker en JSON dans /data

class Scrape {
  constructor() {
    this.scrapeIt = require('scrape-it');
    this.cheerio = require('cheerio');
    this.fetch = require('node-fetch');
  }

  async fetchHTML(link) {
    let response = await this.fetch(link)

    return await response.text();
  }
}


const strman = require('strman');

const config = {
   url: 'http://localhost/materiel_html/materiel/localhost/index.html',
}

const sanitizer = {
  removeRight: (source, needle) => {
    return source.substring(null, source.indexOf(needle));
  },
  deviseToFloat: price => {
    return parseFloat(price.replace(',', '.').replace(' ', ''));
  }
}

class MaterielNet_Laptop extends Scrape {
  constructor() {
    super();

    this.fetchHTML(config.url)
      .then(res => {
        const $ = this.cheerio.load(res);

        this.scrape($);
      });

    const urlArray = [
      "http://localhost/materiel_html/materiel/www.materiel.net/ordinateur-portable/msi-ge62vr-7rf-479xfr-138856.html",
    ];

    urlArray.forEach(url => {
      this.fetchHTML(url)
        .then(res => {
          const $ = this.cheerio.load(res);

          this.scrapeSingleProduct($);
        });
    });

  }

  scrape(html) {
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
          }
        },
      }
    });

    // console.log(data.products[0]);
  }

  scrapeSingleProduct(html){
    const self = this;
    const data = this.scrapeIt.scrapeHTML(html, {
      product: {
        listItem: '#ProdSectionDesc',
        data: {
          processor: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Modèle', self)
            }
          },
          core_nb: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Nombre de curs', self)
            }
          },
          frequency: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Fréquence réelle', self)
            }
          },
          turbo_mode: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Mode Turbo', self)
            }
          },
          ram: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Capacité mémoire', self)
            }
          },
          ram_bars: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Barrette(s) installée(s)', self)
            }
          },
          ram_bars_still_free: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Emplacement(s) libre(s) disponible(s)', self)
            }
          },
          ram_type: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Type', self)
            }
          },
          ram_frequency: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Fréquence', self)
            }
          },
          ram_maximum: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Maximum', self)
            }
          },
          screen_size: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Écran', self)
            }
          },
          touch_screen: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Tactile', self)
            }
          },
          screen_resolution: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Résolution', self)
            }
          },
          screen_type: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Dalle', self)
            }
          },
          screen_aspect: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Aspect de la dalle', self)
            }
          },
          graphic_card_chipset: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Carte graphique', self)
            }
          },
          graphic_memory_type: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Type GDDR', self)
            }
          },
          graphic_max_memory: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Mémoire totale', self)
            }
          },
          storage_capacity: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Espace disque total', self)
            }
          },
          storage_unit_amount: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Nombre d\'unité de stockage', self)
            }
          },
          storage_type: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Type Stockage', self)
            }
          },
          optical_disc_drive: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Lecteur optique', self)
            }
          },
          keyboard: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Clavier', self)
            }
          },
          memory_card_reader: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Lecteur carte(s) mémoire(s)', self)
            }
          },
          touchpad: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Touchpad', self)
            }
          },
          numpad: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Pavé numérique', self)
            }
          },
          webcam: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Webcam', self)
            }
          },
          usb_ports: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'USB', self)
            }
          },
          hdmi_port: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'HDMI', self)
            }
          },
          displayport_port: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'DisplayPort', self)
            }
          },
          rj45_port: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'RJ 45', self)
            }
          },
          // TODO : refactor with a precalculated list of all caracteristics 
          battery_type: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Type', self)
            }
          },
          battery_capacity: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Capacité', self)
            }
          },
          case_main_color: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Couleur dominante', self)
            }
          },
          case_size: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Dimensions', self)
            }
          },
          weight: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Poids en Kg', self)
            }
          },
          OS: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Version système d\'exploitation', self)
            }
          },
          warrant: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Garantie (hors accessoires)', self)
            }
          },
          recommended_usage: {
            selector: 'tr',
            how: TRs => {
              return self.getSpecificFieldValueFromTRs(TRs, 'Utilisation recommandée', self)
            }
          },
        },
      },
    });

    console.log(data);
  };

  getTDsFromChildren(children) {
    let newChildren = [];
    for (var i = 0; i < children.length; i++) {
      if ('td' != children[i].name) {
        continue;
      }
      const child = children[i];
      const attributes = child.attribs;

      if ('ProdSection' === attributes['class']) {
        continue;
      }

      newChildren.push(child);
    }

    return newChildren;
  }

  getProperTDChildren(children) {
    const self = this;
    return children.reduce((result, child) => {
      if ('text' == child.type) {
        if (self.isUselessTextTag(child)) {
          return result;    
        }

        result.push(strman.collapseWhitespace(child.data));
      } else if ('b' == child.name) {
        result.push(strman.collapseWhitespace(child.children[0].data));
      }

      return result;
    }, []);
  }

  isUselessTextTag(tag) {
    if (null != tag.next || null != tag.prev) {
      return true;
    }

    return false;
  }

  getSpecificFieldValueFromTRs(TRs, field, context) {
    for (var i = 0; i < TRs.length; i++) {
      let TDs = context.getTDsFromChildren(TRs[i].children);

      let content = TDs.map(TD => {
        let TDChildren = context.getProperTDChildren(TD.children);

        // There we only have the TD value (I.E: 'Modèle')
        return TDChildren[0];
      });

      if (field == content[0]) {
        return content[1];
      }
    }
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

new MaterielNet_Laptop();
