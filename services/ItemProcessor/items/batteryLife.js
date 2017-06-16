class ItemProcessor_BatteryLife {
  constructor(data, callback) {
    callback(null, this.extract(data));
  }  

  extract(data) {
    return data.map(x => {
      const product = Object.assign({}, {
        battery_approximate_autonomy: false,
      }, x.product);

      return {
        battery_approximate_autonomy: this.keepNumbers(
          product.battery_approximate_autonomy
        ),
      }
    })
  }

  keepNumbers(string = '') {
    return string.replace(/[^\d.-]/g, '');
  }
}

module.exports = ItemProcessor_BatteryLife;