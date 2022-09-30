const { conn } = require('..');
const { UUID, UUIDV4, INTEGER, STRING, DECIMAL, } = require('sequelize');

const Product = conn.define('product', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: {
    type: STRING(20),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [1, 21]
    }
  },
  price: {
    type: DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: true,
      isPositive: (value)=> {
        if(value <= 0){
          throw 'price must be positive'
        }
      }
    }
  },
  numberInStock: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      isInt: true
    }
  }
});

module.exports = Product;