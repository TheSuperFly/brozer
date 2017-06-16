class ItemProcessor_Weight {
  constructor(data, callback) {
    callback(null, this.extract(data));
  }  

  extract(data) {
    return data.map(x => {
      const product = Object.assign({}, {
        weight: false,
      }, x.product);

      return {
        productWeight: this.keepNumbers(product.weight),
      }
    })
  }

  keepNumbers(string = '') {
    return string
      .replace(',', '.')
      .replace(/[^\d.-]/g, '');
  }
}

module.exports = ItemProcessor_Weight;