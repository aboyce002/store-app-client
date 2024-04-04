import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import serverApi from '../../api/serverApi';

export const fetchProduct = createAsyncThunk('products/fetchProduct', async (id) => {
  try {
    const res = await serverApi.get(`/product/${id}`);
    return res.data || false;
  } catch (error) {
    return console.error(error.message);
  }
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const res = await serverApi.get('/products');
    return res.data || false;
  } catch (error) {
    return console.error(error.message);
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState: { productList: [], selectedProduct: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.selectedProduct = action.payload || null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.productList = action.payload || null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload;
      })
  }
});

export const getProduct = state => state.product.selectedProduct;
export const getProducts = state => state.product.productList;
export const getProductById = (state, productId) =>
  state.product.productList.find(product => product.id === productId);
export const getStatus = state => state.product.status;
/*export const filterProductsBySearchParams = (productList, params, paramValues) => {
  let filteredList = productList;
  for (let i = 0; i < params.length; i++) {
    if (paramValues[i] != null) {
      if (params[i].toLowerCase() === 'title') {
        filteredList = filteredList.filter(product => (String(product.title).toLowerCase().includes(String(paramValues[i]).toLowerCase())))
      }
      else
        filteredList = filteredList.filter(product => product[params[i]] === paramValues[i]);
    }
  }
  return filteredList;
}*/
export const makeGetFilteredProductList = (state, searchParams) => {
  const getFilteredProductList = createSelector(
    [
      getProducts,
      (state, searchParams) => searchParams,
    ],
    (productList, searchParams) => {
      let params = searchParams.params;
      let paramValues = searchParams.paramValues;
      let filteredList = productList;
      for (let i = 0; i < params.length; i++) {
        if (paramValues[i] != null) {
          if (params[i].toLowerCase() !== 'title') {
            filteredList = productList.filter(product => product[params[i]] === paramValues[i]);
          }
          else
            filteredList = productList.filter(product => (String(product.title).toLowerCase().includes(String(paramValues[i]).toLowerCase())))

        }
      }
      return filteredList;
    }
  );
  return getFilteredProductList(state, searchParams);
}

export default productSlice.reducer;
