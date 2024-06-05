import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_FRONTEND_URL + '/api',
  headers: {
    "Content-type": "application/json"
  }
});