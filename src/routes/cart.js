const express = require('express');
const { addToCart } = require('../controller/cart');
const router = express.Router();

router.post('/cart/addToCart', addToCart)

module.exports = router;