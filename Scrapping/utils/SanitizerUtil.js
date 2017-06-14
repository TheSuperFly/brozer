const sanitizer = {
  removeRight: (source, needle) => {
    return source.substring(null, source.indexOf(needle));
  },
  removeLeft: (source, needle) => {
    return source.substring(source.indexOf(needle) + 1);
  },
  deviseToFloat: price => {
    return parseFloat(price.replace(',', '.').replace(' ', ''));
  }
}

module.exports = sanitizer;
