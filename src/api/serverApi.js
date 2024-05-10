import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_FRONTEND_URL.toString().concat('/api'),
  headers: {
    "Content-type": "application/json"
  }
});