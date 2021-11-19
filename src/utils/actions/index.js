import axios from 'axios';
import { FETCH_PRODUCTS, FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchProducts = () => async dispatch => {
    const res = await axios.get('https://fakestoreapi.com/products');
    const data = res.data;
    console.log(data);
    dispatch({ type: FETCH_PRODUCTS, payload: res.data });
};
