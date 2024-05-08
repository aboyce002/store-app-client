import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cart: [] },
  reducers: {
    addToCart: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.cartQuantity < item.quantity) {
          item.cartQuantity++;
        } else {
          return;
        }
      } else {
        state.cart.push({ ...action.payload, cartQuantity: 1 });
      }
    },
    changeQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item.cartQuantity > item.quantity) {
        item.cartQuantity = item.quantity;
      }
      else if (item.cartQuantity < 1) {
        item.cartQuantity = 1;
      } else {
        item.cartQuantity = action.payload.quantity;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.cartQuantity <= 1) {
        item.cartQuantity = 1
      } else {
        item.cartQuantity--;
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
    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item.id !== action.payload);
      state.cart = removeItem;
    },
    removeAll: (state, action) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  changeQuantity,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  removeAll
} = cartSlice.actions;

export const getCart = state => state.cart.cart;
export const getCartItemById = (state, cartId) =>
  state.cart.cart.find(cartItem => cartItem.id === cartId);
export const getTotalQuantity = (state) => {
  let totalQuantity = 0
  state.cart.cart.forEach(item => {
    totalQuantity += parseFloat(item.cartQuantity);
  }) 
  return totalQuantity;
}
export const getTotalPrice = (state) => {
  let totalPrice = 0
  state.cart.cart.forEach(item => {
    totalPrice += parseFloat(item.price * item.cartQuantity);
  })
  return totalPrice;
}

export default cartSlice.reducer;
