const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({ kikoo: true });
});

module.exports = router;