import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from './store';

const Orders = ()=> {
  const dispatch = useDispatch();
  const { orders, products } = useSelector(state => state);
  const [ productId, setProductId ] = useState('');
  const [ quantity, setQuantity ] = useState(1);
  const create = async(ev)=> {
    ev.preventDefault();
    const order = { quantity, productId };
    try {
      await dispatch(createOrder(order));
      setProductId('');
      setQuantity(1);
    }
    catch(ex){
      console.log(ex);
    }
  };
  return (
    <div>
      <form onSubmit={ create }>
        <div>
          <label>Quantity ({ quantity })</label>
          <input value={ quantity } onChange={ ev => setQuantity(ev.target.value )}/>
        </div>
        <div>
          <label>Product ({ productId })</label>
          <select value={productId} onChange={ ev => setProductId(ev.target.value) }>
            <option value=''>-- select a product --</option>
            {
              products.map( product => {
                return (
                  <option value={ product.id } key={ product.name }>{ product.name }</option>
                );
              })
            }
          </select>
        </div>
        <button disabled={ !productId }>Create An Order</button>
      </form>
      <ul>
        {
          orders.map( order => {
            const product = products.find(product => product.id === order.productId) || {};
            return (
              <li key={ order.id }>
                { product.name }
                ({ order.quantity })
                <br />
                { order.quantity * product.price } Sub Total
                <Link to={`/orders/${order.id}`}>Edit</Link>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Orders;
