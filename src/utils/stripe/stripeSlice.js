import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import serverApi from '../../api/serverApi';

export const handleToken = createAsyncThunk('stripe/handleToken', async (token) => {
  try {
    const res = await serverApi.post('/stripe', token);
    return res.data;
  } catch(error) {
    return console.error(error.message);
  }
});

export const getStripeSecret = createAsyncThunk('stripe/getStripeSecret', async (token, amount) => {
  try {
    const res = await serverApi.post('/stripe/create-payment-intent', token, amount);
    return res.data;
  } catch(error) {
    return console.error(error.message);
  }
});

export const createPaymentIntent = createAsyncThunk('stripe/createPaymentIntent', async (price) => {
  // Must convert price to a non-decimal format for Stripe to accept it
  const priceToInt = price / Math.pow(10, -2);
  try {
    // Returns secret, which Stripe requires to load components
    const res = await serverApi.post('/stripe/create-payment-intent', {
      price: priceToInt
    });
    return res.data.clientSecret;
  } catch(error) {
    return console.error(error.message);
  }
});

const stripeSlice = createSlice({
  name: 'stripe',
  initialState: { stripe: null, clientSecret: null },
  reducers: {
    handleToken(state, action) {
        state.stripe = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.clientSecret = action.payload || null;
      })
      .addCase(createPaymentIntent.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.error = action.payload;
      })
  }
});

export const getSecret = state => state.stripe.clientSecret;
export const getStatus = state => state.product.status;
export default stripeSlice.reducer;
