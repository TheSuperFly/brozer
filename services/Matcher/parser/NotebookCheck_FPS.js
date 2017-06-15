const stringSimilarity = require('string-similarity');

class NotebookCheck_FPS_Parser {
  constructor(dataSource) {
    this.dataSource = dataSource.data.gpus;
    this.gpuChipName = this.getAllGPUsName();
    
    this.minMatchingRate = 0.90;
  }

  getGPUByName(gpuName) {
    const resolveName = stringSimilarity.findBestMatch(
      gpuName,
      this.gpuChipName
    );

    return this.dataSource.filter(x => {
      if (resolveName.bestMatch.rating >= this.minMatchingRate) {
        return this._normalizeSourceName(x.gpuChip) === resolveName.bestMatch.target
      } 
    });
  }

  getAllGPUsName() {
    return this.dataSource.map(x => {
      return this._normalizeSourceName(x.gpuChip);
    });
  }

  _normalizeSourceName(name) {
    return name
      // Materiel.net does not provide this.
      .replace('(Laptop)', '')
      .replace('(Notebook)', '')
  }
}

module.exports = NotebookCheck_FPS_Parser;
