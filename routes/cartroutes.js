const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartcontroller');

router.post('/cart/add', cartController.addToCart);

router.post('/cart/remove', cartController.removeFromCart);

router.get('/cart/user_id', cartController.viewCart);

module.exports = router;
