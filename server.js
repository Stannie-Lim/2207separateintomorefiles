const express = require('express');
const { conn, seed, Product, Order } = require('./db');
const app = express();
const path = require('path');
app.use(express.json());


app.use('/dist', express.static('dist'));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/products', (req, res, next)=> {
  /*
  try {
    const products = await Product.findAll();
    res.send(products);
  }
  catch(ex){
    next(ex);
  }
  */
  Product.findAll()
    .then( products => res.send(products))
    .catch(next);
});


app.post('/api/orders', async(req, res, next)=> {
  try {
    res.status(201).send(await Order.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});
app.get('/api/orders', (req, res, next)=> {
  Order.findAll()
    .then( orders => res.send(orders))
    .catch(next);
});

app.put('/api/orders/:id', async(req, res, next)=> {
  try {
    const order = await Order.findByPk(req.params.id);
    await order.update(req.body);
    res.send(order);
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/products/:id', (req, res, next)=> {
  Product.findByPk(req.params.id)
    .then( product => product.update(req.body))
    .then( product => res.send(product))
    .catch(next);
});

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send(err);
});


const start = async()=> {
  try {
    await conn.sync({ force: true });
    await seed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

start();

