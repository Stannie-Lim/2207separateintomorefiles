const Order = require('./models/Order');
const Product = require('./models/Product');

Product.hasMany(Order);
Order.belongsTo(Product);

module.exports = {
  Order,
  Product,
};