import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import serverApi from '../../api/serverApi';

export const fetchOrder = createAsyncThunk('orders/fetchOrder', async (orderId) => {
  try {
    const res = await serverApi.get(`/orders/${orderId}`);
    return res.data || false;
  } catch (error) {
    return console.error(error.message);
  }
});

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  try {
    const res = await serverApi.get('/orders');
    return res.data || false;
  } catch (error) {
    return console.error(error.message);
  }
});

export const fetchOrdersForUser = createAsyncThunk('orders/fetchOrdersForUser', async (userId) => {
  try {
    const res = await serverApi.get(`/orders/user/${userId}`);
    return res.data || false;
  } catch (error) {
    return console.error(error.message);
  }
});

export const fetchDetailsForOrder = createAsyncThunk('orders/fetchDetailsForOrder', async (orderId) => {
  try {
    const res = await serverApi.get(`/orders/details/${orderId}`);
    return res.data || false;
  } catch (error) {
    return console.error(error.message);
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState: { orderList: [], selectedOrder: null, detailsForOrder: [] },
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrder.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchOrders.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchOrdersForUser.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchDetailsForOrder.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.orderList = action.payload;
      })
      .addCase(fetchOrdersForUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.orderList = action.payload;
      })
      .addCase(fetchDetailsForOrder.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.detailsForOrder = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload.message;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload.message;
      })
      .addCase(fetchOrdersForUser.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload.message;
      })
      .addCase(fetchDetailsForOrder.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload.message;
      })
  }
});

export const getOrder = state => state.order.selectedOrder;
export const getOrders = state => state.order.orderList;
export const getDetailsForOrder = state => state.order.detailsForOrder;
export const getStatus = state => state.order.status;
export default orderSlice.reducer;
