import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from "../src/utils/store";
import { PersistGate } from 'redux-persist/integration/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import Fonts from './theme/Fonts';
import App from './components/App';
import axios from 'axios';

window.axios = axios;

// const store = configureStore({reducer: reducers});

const root = createRoot(document.querySelector('#root'));
root.render(
  // <GlobalProvider><Provider store={store}><ChakraProvider><App/></ChakraProvider></Provider></GlobalProvider>
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Fonts />
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </ChakraProvider>
  </Provider>
);
// <PersistGate loading={<Loader />} persistor={persistor}>
