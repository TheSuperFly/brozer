class ItemProcessor_GPU {
  constructor(data, callback) {
    callback(null, this.extract(data));
  }  

  extract(data) {
    return data.map(x => {
      const GPU_Benchmark = Object.assign({}, {
        name: '',
        g3dMark: false,
      }, x.gpuData.GPU_Benchmark[0]);

      return {
        gpuName: GPU_Benchmark.name,
        g3dMark: GPU_Benchmark.g3dMark,
      }
    })
  }
}

module.exports = ItemProcessor_GPU;