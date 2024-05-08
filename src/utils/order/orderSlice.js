import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import serverApi from '../../api/serverApi';

// Fetch order by order id
export const fetchOrder = createAsyncThunk('orders/fetchOrder', async (id) => {
  try {
    const res = await serverApi.get(`/orders/${id}`);
    return res.data || false;
  } catch (error) {
    return console.error(error.message);
  }
});

// Fetch all orders
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  try {
    const res = await serverApi.get('/orders');
    return res.data || false;
  } catch (error) {
    return console.error(error.message);
  }
});

// Fetch all orders for user
export const fetchOrdersForUser = createAsyncThunk('orders/fetchOrdersForUser', async (user_id) => {
  try {
    const res = await serverApi.get(`/orders/user/${user_id}`);
    return res.data || false;
  } catch (error) {
    return console.error(error.message);
  }
});

// Fetch order details for an order
export const fetchDetailsForOrder = createAsyncThunk('orders/fetchDetailsForOrder', async (order_id) => {
  try {
    const res = await serverApi.get(`/orders/${order_id}/details`);
    return res.data || false;
  } catch (error) {
    return console.error(error.message);
  }
});

export const createOrder = createAsyncThunk('orders/createOrder', async (order) => {
  try {
    const res = await serverApi.post(`/orders`, {
      user_id: order.user_id,
      address_id: order.address_id,
      provider: order.provider,
      status: order.status,
      preorder: order.preorder,
      paid: order.paid,
      discount: order.discount,
      total: order.total,
      date_created: order.date_created,
      ship_date: order.ship_date,
      order_fulfilled: order.order_fulfilled,
      shipped_by: order.shipped_by,
      tracking_number: order.tracking_number
    });
    return res.data || false;
  } catch (error) {
    return console.error(error.message);
  }
});

export const createOrderDetails = createAsyncThunk('orders/createOrderDetails', async ({ order_id, orderDetails }) => {
  try {
    const res = await serverApi.post(`/orders/${order_id}/details`, {
      price: orderDetails.price,
      quantity: orderDetails.quantity,
      discount: orderDetails.discount,
      total: orderDetails.total,
      product_id: orderDetails.product_id,
      product_total: orderDetails.product_total
    });
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
