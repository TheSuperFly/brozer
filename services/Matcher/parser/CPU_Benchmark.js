const stringSimilarity = require('string-similarity');

class CPU_Benchmark_Parser {
  constructor(dataSource) {
    this.dataSource = dataSource.data.cpus;
    this.cpuChipName = this.getAllCPUsName();
    
    this.minMatchingRate = 0.85;
  }

  getCPUByName(name) {
    const normalizedName = this._normalizeName(name);

    const resolveName = stringSimilarity.findBestMatch(
      normalizedName,
      this.cpuChipName
    );

    return this.dataSource.filter(x => {
      if (resolveName.bestMatch.rating >= this.minMatchingRate)
        return this._normalizeSourceName(x.name) === resolveName.bestMatch.target
    });
  }

  getAllCPUsName() {
    return this.dataSource.map(x => {
      return this._normalizeSourceName(x.name);
    });
  }

  _normalizeName(name) {
    return name
      // CPUBenchmark doesn't have brand in chipname.
      .replace('®', '')
      // Remove Materiel.net "Processeur"
      .replace('Processeur ', '')
      // Remove parenthesis around CPU frequency
      .replace('(', '')
      .replace(')', '')
      .replace(' GHz', 'GHz')
      // Changing French decimal to English
      .replace(',', '.')
  }

  _normalizeSourceName(name) {
    return name
      // Remove unmet @ in Materiel.net
      .replace('@ ', '');
  }
}

module.exports = CPU_Benchmark_Parser;
