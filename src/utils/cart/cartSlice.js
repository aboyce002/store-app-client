import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cart: [] },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        if (itemInCart.cartQuantity < itemInCart.quantity) {
          itemInCart.cartQuantity++;
        } else {
          return;
        }
      } else {
        state.cart.push({ ...action.payload, cartQuantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.cartQuantity < item.quantity) {
        item.cartQuantity++;
      } else {
        return;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.cartQuantity === 1) {
        item.cartQuantity = 1
      } else {
        item.cartQuantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item.id !== action.payload);
      state.cart = removeItem;
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} = cartSlice.actions;
export const getCart = state => state.cart.cart;
export default cartSlice.reducer;
