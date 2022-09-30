const router = require('express').Router();
const { Order } = require('../db/associations');

module.exports = router;

// everything in this route has a `/api/orders` at the front of it
router.post('/', async(req, res, next)=> {
  try {
    res.status(201).send(await Order.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});
router.get('/', (req, res, next)=> {
  Order.findAll()
    .then( orders => res.send(orders))
    .catch(next);
});

router.put('/:id', async(req, res, next)=> {
  try {
    const order = await Order.findByPk(req.params.id);
    await order.update(req.body);
    res.send(order);
  }
  catch(ex){
    next(ex);
  }
});