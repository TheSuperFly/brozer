class MaterielNet_Laptop_Parser {
  constructor(dataSource) {
    this.dataSource = dataSource.MaterielNet_Laptop.data;
  }

  getAllGPUs() {
    return this.dataSource.map(x => {
      return x.graphic_card_chipset;
    });
  }

  getAllCPUs() {
    return this.dataSource.map(x => {
      return x.processor;
    });
  }
}

module.exports = MaterielNet_Laptop_Parser;
