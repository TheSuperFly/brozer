let RandomHandler = {};

RandomHandler.renderDumb = (req, res) => {
  res.send({ kikoo: true })
};

module.exports = RandomHandler;