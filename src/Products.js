import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Products = ()=> {
  const { products } = useSelector(state => state);


  return (
    <ul>
      {
        products.map( product => {
          return (
            <li key={ product.id }>
              { product.name }
              (${ product.price })
              <br />
              Number In Stock { product.numberInStock }
              <Link to={`/products/${product.id}`}>Edit</Link>
            </li>
          );
        })
      }
    </ul>
  );
};

export default Products;
