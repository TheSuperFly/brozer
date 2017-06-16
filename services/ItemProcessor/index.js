const parallel = require('async/parallel');

const ItemProcessor_CPU = require('./items/cpu');
const ItemProcessor_GPU = require('./items/gpu');
const ItemProcessor_GPU_FPS = require('./items/gpuFps');
const ItemProcessor_RAM = require('./items/ram');
const ItemProcessor_BatteryLife = require('./items/batteryLife');
const ItemProcessor_Storage = require('./items/storage');
const ItemProcessor_Weight = require('./items/weight');
const ItemProcessor_Price = require('./items/price');

class ItemProcessor {
  loadProcessors(data) {
    return {
      CPU: callback => new ItemProcessor_CPU(data, callback),
      GPU: callback => new ItemProcessor_GPU(data, callback),
      GPU_FPS: callback => new ItemProcessor_GPU_FPS(data, callback),
      RAM: callback => new ItemProcessor_RAM(data, callback),
      BatteryLife: callback => new ItemProcessor_BatteryLife(data, callback),
      Storage: callback => new ItemProcessor_Storage(data, callback),
      Weight: callback => new ItemProcessor_Weight(data, callback),
      Price: callback => new ItemProcessor_Price(data, callback),
    };
  }

  process(data) {
    const processors = this.loadProcessors(data);

    let combinedList;

    parallel(processors, (err, data) => {
      if (err) throw new Error(err);

      combinedList = data;
    });

    return combinedList;
  }
}

module.exports = ItemProcessor;