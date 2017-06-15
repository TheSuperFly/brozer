const Scrapping = require('../Scrapping');

const MaterielNet_Laptop_Parser = require('./parser/MaterielNet_Laptop');

const SourceParser = require('./parser');

class Matcher {
  /**
   * Scrape all items then match.
   * @param {Function} callback(data)
   */
  scrapeThenMatch(callback) {
    const scrapping = new Scrapping();

    scrapping.scrapeAll(async (err, data) => {
      if (err) throw new Error('Scrapping failed');

      const matchedData = await this.match(data);

      callback(matchedData);
    });
  }

  /**
   * Match products & Performances together.
   * @param {ScrapeAnswer} data 
   */
  async match(data) {
    const allSources = new SourceParser(data);

    const matosParser = new MaterielNet_Laptop_Parser(data);
    const allGPUs = matosParser.getAllGPUs();
    const allCPUs = matosParser.getAllCPUs();

    let foundGPUs = [];
    let foundCPUs = [];

    await allGPUs.forEach((gpu, index) => {
      foundGPUs.push({
        index,
        gpuData: allSources.findGPUInAllSources(gpu)
      });
    });

    await allCPUs.forEach((cpu, index) => {
      foundCPUs.push({
        index,
        cpuData: allSources.findCPUInAllSources(cpu)
      })
    });

    return foundGPUs.map(x => {
      return {
        gpuData: x.gpuData,
        cpuData: foundCPUs[x.index].cpuData,
        product: data.MaterielNet_Laptop.data[x.index]
      }
    });
  }
}

module.exports = Matcher;
