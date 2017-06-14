const express = require('express');
const app = express();

app.use('/random', require('./RandomRoute'));

module.exports = app;