import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart/cartSlice';
import orderReducer from './order/orderSlice';
import productReducer from './products/productsSlice';
import stripeReducer from './stripe/stripeSlice';
import userAddressReducer from './useraddress/userAddressSlice';
import userReducer from './user/userSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, cartReducer)

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    order: orderReducer,
    product: productReducer,
    stripe: stripeReducer,
    userAddress: userAddressReducer,
    user: userReducer,
    devTools: true
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store)
