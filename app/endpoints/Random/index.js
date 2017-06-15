const express = require('express');
const router = express.Router();

const RandomHandler = require('./handler');

router.get('/', RandomHandler.renderDumb);

module.exports = router;
