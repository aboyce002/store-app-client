import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart/cartSlice';
import userReducer from './user/userSlice';
import productReducer from './products/productsSlice';
import stripeReducer from './stripe/stripeSlice';
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
    user: userReducer,
    product: productReducer,
    stripe: stripeReducer,
    cart: persistedReducer,
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
