const { Product, Order } = require('./associations');

const seed = async()=> {
  const [ foo, bar ] = await Promise.all([
    Product.create({ name: 'foo', price: 2.99, numberInStock: 7}),
    Product.create({ name: 'bar', price: 2.99, numberInStock: 7}),
  ]);
  return Promise.all([
    Order.create({ productId: foo.id }),
    Order.create({ productId: foo.id, quantity: 3 })
  ]);
};

module.exports = seed;