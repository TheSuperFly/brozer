class ItemProcessor_GPU_FPS {
  constructor(data, callback) {
    callback(null, this.extract(data));
  }  

  extract(data) {
    return data.map(x => {
      const NotebookCheck_FPS = Object.assign({}, {
        fpsList: false,
      }, x.gpuData.NotebookCheck_FPS[0]);

      return {
        fpsList: NotebookCheck_FPS.fpsList
      }
    })
  }
}

module.exports = ItemProcessor_GPU_FPS;