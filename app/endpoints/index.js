const express = require('express');
const app = express();

app.use('/random', require('./Random'));
app.use('/questions', require('./Question'));
app.use('/debug', require('./ManualProductFilling'));

module.exports = app;
