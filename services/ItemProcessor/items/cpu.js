class ItemProcessor_CPU {
  constructor(data, callback) {
    callback(null, this.extract(data));
  }

  extract(data) {
    return data.map(x => {
      const CPU_Benchmark = Object.assign({}, {
        name: '',
        cpuMark: false,
      }, x.cpuData.CPU_Benchmark[0]);

      return {
        cpuName: CPU_Benchmark.name,
        cpuMark: CPU_Benchmark.cpuMark,
      };
    });
  }
}

module.exports = ItemProcessor_CPU;