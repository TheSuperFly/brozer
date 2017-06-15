const express = require('express');
const router = express.Router();

const ManualProductFillingHandler = require('./handler');

router.get('/', ManualProductFillingHandler.getAddProductsForm);
router.post('/', ManualProductFillingHandler.addProducts);

module.exports = router;
