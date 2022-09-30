const router = require('express').Router();

module.exports = router;

// every route in here has a `/api` before it in the url
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));