import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import serverApi from '../../api/serverApi';

export const handleToken = createAsyncThunk('stripe/handleToken', async (token) => {
  try {
    const res = await serverApi.post('/stripe', token);
    return res.data;
  } catch (error) {
    return console.error(error.message);
  }
});

export const createOrder = createAsyncThunk('paypal/createOrder', async (price, data, actions) => {
  try {
    const res = await serverApi.post('/paypal/create-paypal-order', {
      price: price
    });
    console.log("order: ", res.data);
    return res.data.id;
  } catch (error) {
    return console.error(error.message);
  }
});

export const onApprove = createAsyncThunk('paypal/onApprove', (data, actions) => {
  console.log("order id from approve: ", getCurrentOrderID())
  const res = serverApi.post(`/paypal/capture-paypal-order`, {
    orderId: getCurrentOrderID()
  });
  // Three cases to handle:
  //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
  //   (2) Other non-recoverable errors -> Show a failure message
  //   (3) Successful transaction -> Show confirmation or thank you

  // This example reads a v2/checkout/orders capture response, propagated from the server
  // You could use a different API or structure for your 'orderData'

  const errorDetail = Array.isArray(res.data.details) && res.data.details[0];
  if (errorDetail && errorDetail.issue === 'INSTRUMENT_DECLINED') {
    return actions.restart(); // Recoverable state, per:
    // https://developer.paypal.com/docs/checkout/integration-features/funding-failure/
  }

  if (errorDetail) {
    let msg = 'Sorry, your transaction could not be processed.';
    if (errorDetail.description) msg += ' ' + errorDetail.description;
    if (res.data.details.debug_id) msg += ' (' + res.data.details.debug_id + ')';
    return alert(msg); // Show a failure message (try to avoid alerts in production environments)
  }

  // Successful capture! For demo purposes:
  console.log('Capture result', res.data, JSON.stringify(res.data, null, 2));
  const transaction = res.data.purchase_units[0].payments.captures[0];
  alert('Transaction ' + transaction.status + ': ' + transaction.id + ' See console for all available details');
  return res.data;
});

const paypalSlice = createSlice({
  name: 'paypal',
  initialState: { orderID: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.orderID = action.payload || null;
      })
      .addCase(createOrder.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.payload;
      })
  }
});

export const getCurrentOrderID = state => state.paypal.orderID;
export const getStatus = state => state.paypal.status;
export default paypalSlice.reducer;
