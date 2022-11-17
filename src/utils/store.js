import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice';
import productReducer from './products/productsSlice';
import stripeReducer from './stripe/stripeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    stripe: stripeReducer
  }
});
