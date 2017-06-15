const express = require('express');
const app = express();

app.use('/random', require('./RandomRoute'));
app.use('/questions', require('../../services/Question/routes'));

module.exports = app;
