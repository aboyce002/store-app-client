import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';
import { ChakraProvider } from "@chakra-ui/react"
import './index.css'
import App from './components/App';
import reducers from './utils/reducers';
import axios from 'axios';

window.axios = axios;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
  <ChakraProvider><Provider store={store}><App/></Provider></ChakraProvider>,
  document.querySelector('#root')
);
