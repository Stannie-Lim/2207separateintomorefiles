const router = require('express').Router();
const { Product } = require('../db/associations');

module.exports = router;

// every route in here has a `/api/products` before it in the url
router.get('/', (req, res, next)=> {
  Product.findAll()
    .then( products => res.send(products))
    .catch(next);
});

router.put('/:id', (req, res, next)=> {
  Product.findByPk(req.params.id)
    .then( product => product.update(req.body))
    .then( product => res.send(product))
    .catch(next);
});