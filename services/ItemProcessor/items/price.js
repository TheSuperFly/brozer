class ItemProcessor_Price {
  constructor(data, callback) {
    callback(null, this.extract(data));
  }  

  extract(data) {
    return data.map(x => {
      const product = Object.assign({}, {
        price: false,
        promotion_percent: false,
        promotion_value: false,
      }, x.product);

      return {
        price: this.keepNumbers(product.price),
        promotion_percent: this.keepNumbers(product.promotion_percent),
        promotion_value: product.promotion_value,
      };
    });
  }

  keepNumbers(string = '') {
    return string
      .replace(',', '.')
      .replace(/[^\d.-]/g, '');
  }
}

module.exports = ItemProcessor_Price;