import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { ChakraProvider } from "@chakra-ui/react"
import './index.css'
import App from './components/App';
import reducers from './utils/reducers';
import axios from 'axios';

window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <ChakraProvider><Provider store={store}><App/></Provider></ChakraProvider>,
  document.querySelector('#root')
);
