import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrder } from './store';

const OrderUpdate = ()=> {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { orders, products } = useSelector(state => state);

  const update = async(ev)=> {
    ev.preventDefault();
    try {
      const order = { id, productId, quantity };
      await dispatch(updateOrder(order));
      navigate('/orders');
    }
    catch(ex){
      console.log(ex);
    }
  };

  useEffect(()=> {
    const order = orders.find( order => order.id === id);
    if(order){
      setProductId(order.productId);
      setQuantity(order.quantity);
    }
  }, [orders, id]);

  return (
    <form onSubmit={ update }>
      <div>
        <label>Quantity</label>
        <input value={ quantity } onChange={ ev => setQuantity(ev.target.value )}/>
      </div>
      <div>
        <label>Product</label>
        <select value={ productId } onChange={ ev => setProductId(ev.target.value)}>
          <option value=''>-- choose a product</option>
          {
            products.map( product => {
              return (
                <option key={ product.id } value={ product.id }>{ product.name }</option>
              );
            })
          }
        </select>
      </div>
      <button disabled={ !productId }>Update</button>
    </form>
  );
};

export default OrderUpdate;
