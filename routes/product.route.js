const express = require('express');
const product = require('../controllers/product.controller');

const router = express.Router();

router.get('/', product.findAll);

router.get('/:id', product.findById);

router.post('/', product.save);

router.put('/:id', product.update);

router.delete('/:id', product.delete);

module.exports = router;