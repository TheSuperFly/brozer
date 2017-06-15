const express = require('express');
const router = express.Router();

router.get('/view', (req, res) => {
  res.render('pages/about')
});

module.exports = router;
