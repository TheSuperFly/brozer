const parallelLimit = require('async/parallelLimit');

const MaterielNet_Laptop = require('./MaterielNet_Laptop');
const NotebookCheck_FPS = require('./NotebookCheck_FPS');
const GPU_Benchmark = require('./GPU_Benchmark');
const CPU_Benchmark = require('./CPU_Benchmark');

const endpoint = require('./endpoints');

class ScrapeDispatcher {
  constructor() {
    this.scrapeBatchSize = 3;
    
    this.Products = {
      MaterielNet_Laptop: callback => new MaterielNet_Laptop(
        endpoint.product.MaterielNet_Laptop,
        data => callback(null, data)
      ),
    };

    this.Sources = {
      NotebookCheck_FPS: callback => new NotebookCheck_FPS(
        endpoint.data.NotebookCheck_FPS,
        data => callback(null, data)
      ),
      MaterielNet_Laptop: callback => new MaterielNet_Laptop(
        endpoint.product.MaterielNet_Laptop,
        data => callback(null, data)
      ),
      GPU_Benchmark: callback => new GPU_Benchmark(
        endpoint.data.GPU_Benchmark,
        data => callback(null, data)
      ),
      CPU_Benchmark: callback => new CPU_Benchmark(
        endpoint.data.CPU_Benchmark,
        data => callback(null, data)
      )
    };
  }

  scrapeProducts(callback) {
    parallelLimit(this.Products, this.scrapeBatchSize, callback);
  }

  scrapeSources(callback) {
    parallelLimit(this.Sources, this.scrapeBatchSize, callback);
  }
  
  scrapeGPUSpecs(callback) {
    parallelLimit(this.Sources.GPU_Benchmark, this.scrapeBatchSize, callback);
  }

  scrapeCPUSpecs(callback) {
    parallelLimit(this.Sources.CPU_Benchmark, this.scrapeBatchSize, callback);
  }
  
  scrapeAll(callback) {
    const { Sources, Products } = this;

    const combined = Object.assign({}, Sources, Products);

    parallelLimit(combined, this.scrapeBatchSize, callback);
  }
}

module.exports = ScrapeDispatcher;
