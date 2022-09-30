const { conn } = require('..');
const { UUID, UUIDV4, INTEGER } = require('sequelize');

const Order = conn.define('order', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  quantity: {
    type: INTEGER,
    defaultValue: 1,
    allowNull: false
  }
});

module.exports = Order;