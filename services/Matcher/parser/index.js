const NotebookCheck_FPS_Parser = require('./NotebookCheck_FPS');
const GPU_Benchmark_Parser = require('./GPU_Benchmark');
const CPU_Benchmark_Parser = require('./CPU_Benchmark');

class SourceParser {
  constructor(dataSource) {
    this.NotebookCheck_FPS_Parser = new NotebookCheck_FPS_Parser(
      dataSource.NotebookCheck_FPS
    );

    this.GPU_Benchmark_Parser = new GPU_Benchmark_Parser(
      dataSource.GPU_Benchmark
    );
    
    this.CPU_Benchmark_Parser = new CPU_Benchmark_Parser(
      dataSource.CPU_Benchmark
    );
  }

  findGPUInAllSources(gpu) {
    return {
      NotebookCheck_FPS: this.NotebookCheck_FPS_Parser.getGPUByName(gpu),
      GPU_Benchmark: this.GPU_Benchmark_Parser.getGPUByName(gpu)
    };
  }

  findCPUInAllSources(cpu) {
    return {
      CPU_Benchmark: this.CPU_Benchmark_Parser.getCPUByName(cpu)
    };
  }
}

module.exports = SourceParser;
