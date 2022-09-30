import React, { useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, fetchOrders } from './store';
import Products from './Products';
import Orders from './Orders';
import ProductUpdate from './ProductUpdate';

const App = ()=> {
  const { orders, products } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchProducts());
    dispatch(fetchOrders())
      .catch(ex => console.log(ex.response));
  }, []);

  return (
    <div>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/products'>Products ({ products.length })</Link>
        <Link to='/orders'>Orders ({ orders.length })</Link>
      </nav>
      <Routes>
        <Route path='/' element={ <div>Home</div> } />
        <Route path='/products' element={ <Products /> } />
        <Route path='/orders' element={ <Orders /> } />
        <Route path='/products/:id' element={ <ProductUpdate /> } />
      </Routes>
    </div>
  );
};

export default App;
