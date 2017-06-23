const express = require('express');
const router = express.Router();

const QuerierHandler = require('./handler');

router.get('/scrapThenMatch', QuerierHandler.getScrapThenMatch);

module.exports = router;