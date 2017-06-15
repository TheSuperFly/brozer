const stringSimilarity = require('string-similarity');

class GPU_Benchmark_Parser {
  constructor(dataSource) {
    this.dataSource = dataSource.data.gpus;
    this.gpuChipName = this.getAllGPUsName();
    
    this.minMatchingRate = 0.8;
  }

  getGPUByName(name) {
    const normalizedName = this._normalizeName(name);

    const resolveName = stringSimilarity.findBestMatch(
      normalizedName,
      this.gpuChipName
    );

    return this.dataSource.filter(x => {
      if (resolveName.bestMatch.rating >= this.minMatchingRate)
        return x.name === resolveName.bestMatch.target
    });
  }

  getAllGPUsName() {
    return this.dataSource.map(x => {
      return x.name;
    });
  }

  _normalizeName(name) {
    return name
      // GPUBenchmark doesn't have brand in chipname.
      .replace('NVIDIA', '')
      .replace('Intel', '')
      .replace('AMD', '');
  }
}

module.exports = GPU_Benchmark_Parser;
