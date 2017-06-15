const express = require('express');
const app = express();

app.use('/random', require('./Random'));
app.use('/questions', require('./Question'));

module.exports = app;
