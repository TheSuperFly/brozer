const cli = require('cli');
const express = require('express');
const app = express();

const routes = require('./endpoints');

require('./db.js');

app.set('view engine', 'ejs');

app.use(routes);

app.use(function(err, req, res, next) {
  console.error(err.stack);

  if (req.is('html'))
    res.status(500).send('Something went wrong.');
  else
    res.status(500).send({
      payload: {
        error: {
          text: 'Something went wrong.',
          err
        }
      }
    });
});

app.listen(7777, function () {
  cli.ok('Running app through http://localhost:7777/')
});
