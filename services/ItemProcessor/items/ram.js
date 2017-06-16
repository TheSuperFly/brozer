class ItemProcessor_RAM {
  constructor(data, callback) {
    callback(null, this.extract(data));
  }  

  extract(data) {
    return data.map(x => {
      const product = Object.assign({}, {
        ram: false,
      }, x.product);

      return {
        productRAM: this.keepNumbers(product.ram),
      }
    })
  }

  keepNumbers(string = '') {
    return string.replace(/[^\d.-]/g, '');
  }
}

module.exports = ItemProcessor_RAM;