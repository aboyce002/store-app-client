import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useSearchParams } from "react-router-dom";
import serverApi from '../../api/serverApi';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const res = await serverApi.get('/products', {
    //use searchValue here
    //params: { searchParams }
  });
  console.log(res);
  return res.data || false;
});
export const fetchProduct = createAsyncThunk('products/fetchProduct', async () => {
  const res = await serverApi.get('/product/:id', {
    //use searchValue here
    //params: { searchParams }
  });
  return res.data || false;
});

const productSlice = createSlice({
  name: 'product',
  initialState: { productList: [], selectedProduct: null },
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'idle'
        state.productList = action.payload || null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isFetching = false
      })
      .addCase(fetchProduct.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'idle'
        state.selectedProduct = action.payload || null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isFetching = false
      })
  }
});

export const getProducts = state => state.product.productList;
export const getProduct = state => state.product.selectedProduct;
export const getProductById = (state, productId) =>
  state.product.productList.find(product => product.id === productId);
export const filterProductsByCategory = (state, productCategory) =>
  state.product.productList.filter(product => product.category === productCategory);
export default productSlice.reducer;
