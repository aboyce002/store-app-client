import axios from 'axios';
import { FETCH_PRODUCTS, FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    console.log("Login info from actions:" + res.data);
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    console.log("Stripe data from actions:" + res.data);
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchProducts = () => async dispatch => {
    const res = await axios.get('https://fakestoreapi.com/products');
    const data = res.data;
    console.log("Products from actions:" + data);
    dispatch({ type: FETCH_PRODUCTS, payload: res.data });
};
