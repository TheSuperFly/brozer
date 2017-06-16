class ItemProcessor_Storage {
  constructor(data, callback) {
    callback(null, this.extract(data));
  }  

  extract(data) {
    return data.map(x => {
      const product = Object.assign({}, {
        storage_capacity: false,
        storage_type: false,
      }, x.product);

      return {
        storage_type: this.processStorageType(product.storage_type),
        storage_capacity: this.keepNumbers(
          product.storage_capacity
        ),
      }
    })
  }

  processStorageType(type = '') {
    const typeArray = type.split(' + ');

    return {
      SSD: (typeArray.indexOf('SSD') !== -1),
      HDD: (typeArray.indexOf('HDD') !== -1),
    }
  }

  keepNumbers(string = '') {
    return string.replace(/[^\d.-]/g, '');
  }
}

module.exports = ItemProcessor_Storage;