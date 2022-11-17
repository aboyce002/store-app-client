import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { GlobalProvider } from './utils old/contexts/GlobalState';
import { configureStore } from "@reduxjs/toolkit";
import { store } from "../src/utils/store"
import { ChakraProvider } from "@chakra-ui/react"
import './index.css'
import App from './components/App';
import reducers from './utils old/reducers';
import axios from 'axios';

window.axios = axios;

//const store = configureStore({reducer: reducers});

const root = createRoot(document.querySelector('#root'));
root.render(
  //<GlobalProvider><Provider store={store}><ChakraProvider><App/></ChakraProvider></Provider></GlobalProvider>
  <Provider store={store}><ChakraProvider><App/></ChakraProvider></Provider>
);
