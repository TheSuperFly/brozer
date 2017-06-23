const express = require('express');
const app = express();

app.use('/ask', require('./Querier'));
app.use('/questions', require('./Question'));
app.use('/debug', require('./ManualProductFilling'));
app.use('/random', require('./Random'));

module.exports = app;
