import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

const products = (state = [], action)=> {
  if(action.type === 'SET_PRODUCTS'){
    return action.products;
  }
  if(action.type === 'UPDATE_PRODUCT'){
    return state.map(product => product.id === action.product.id ? action.product : product);
  }
  return state;
}

const orders = (state = [], action)=> {
  if(action.type === 'SET_ORDERS'){
    return action.orders;
  }
  if(action.type === 'CREATE_ORDER'){
    return [...state, action.order];
  }
  return state;
}

//action creators
const setProducts = products => {
  return {
    type: 'SET_PRODUCTS',
    products
  };
};

const setOrders = orders => {
  return {
    type: 'SET_ORDERS',
    orders
  };
};

const _updateProduct = product => {
  return {
    type: 'UPDATE_PRODUCT',
    product
  };
};

const _createOrder = order => {
  return {
    type: 'CREATE_ORDER',
    order
  };
};

export const fetchProducts = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/products');
    dispatch(setProducts(response.data));
  };
};

export const fetchOrders = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/orders');
    dispatch(setOrders(response.data));
  };
};

export const createOrder = (order)=> {
  return async (dispatch)=> {
    const response = await axios.post('/api/orders', order);
    dispatch(_createOrder(response.data));
  };
};
export const updateProduct = (product, navigate)=> {
  return async(dispatch)=> {
    const response = await axios.put(`/api/products/${product.id}`, product);
    navigate('/products');
    dispatch(_updateProduct(response.data));
  };
};

const reducer = combineReducers({
  products,
  orders
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
