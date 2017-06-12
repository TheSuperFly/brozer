const sanitizer = {
  removeRight: (source, needle) => {
    return source.substring(null, source.indexOf(needle));
  },
  deviseToFloat: price => {
    return parseFloat(price.replace(',', '.').replace(' ', ''));
  }
}

module.exports = sanitizer;
