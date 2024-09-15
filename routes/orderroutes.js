const express = require('express');
const router = express.Router();
const { placeOrder } = require('../controllers/ordercontroller');

router.post('/placeorder', placeOrder);

module.exports = router;
