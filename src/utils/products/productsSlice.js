import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import serverApi from '../../api/serverApi';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const res = await serverApi.get('/products');
    return res.data || false;
  } catch(error) {
    return console.error(error.message);
  }
});

export const fetchProduct = createAsyncThunk('products/fetchProduct', async (id) => {
  try {
    const res = await serverApi.get(`/product/${id}`);
  return res.data || false;
  } catch(error) {
    return console.error(error.message);
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState: { productList: [], selectedProduct: null },
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.productList = action.payload || null;
      })
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.selectedProduct = action.payload || null;
      })
      .addCase(fetchProduct.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
  }
});

export const getProducts = state => state.product.productList;
export const getProduct = state => state.product.selectedProduct;
export const getProductById = (state, productId) =>
  state.product.productList.find(product => product.id === productId);
export const getStatus = state => state.product.status;
export const filterProductsBySearchParams = (state, params, paramValues) => {
  let filteredList = state.product.productList;
  for (let i = 0; i < params.length; i++) {
    if(paramValues[i] != null)
    {
      if (params[i].toLowerCase() === 'title')
        filteredList = filteredList.filter(product => String(product).toLowerCase().includes(String(paramValues[i]).toLowerCase()));
      else
        filteredList = filteredList.filter(product => product[params[i]] === paramValues[i]);
    }
    console.log("Filtered list: " + filteredList);
  }
  return filteredList;
}
/*export const filterProductByCategory = (state, param, paramValue) =>
    state.product.productList.filter(product => product[param] === paramValue);*/
export default productSlice.reducer;
