import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import serverApi from '../../api/serverApi';

export const fetchProducts = createAsyncThunk('products/fetchProduct', async () => {
  const res = await serverApi.get('/products', {
    //use searchValue here
    //params: { searchParams }
  });
  return res.data || false;
});

const productSlice = createSlice({
  name: 'product',
  initialState: { productList: [], selectedProduct: null },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'idle'
        state.productList = action.payload || null;
      })
      .addCase(fetchProducts.rejected, (state,action) => {
        state.isFetching = false
      })
  }
});

export const getProducts = state => state.product.productList;
export default productSlice.reducer;
