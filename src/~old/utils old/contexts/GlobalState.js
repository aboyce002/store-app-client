import { createContext, useReducer } from 'react';
import ProductDataService from "../services/productService"
import productReducer from '../reducers/productReducer';

const initialState = {
  productList: [],
  selectedProduct: null
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  function addProduct(product) {
    dispatch({
      type: 'ADD_PRODUCT',
      payload: product
    });
  }

  function editProduct(product) {
    dispatch({
      type: 'EDIT_PRODUCT',
      payload: product
    });
  }

  const fetchProduct = id => async () => {
    try {
      const res = await ProductDataService.getById(id);

      dispatch({
        type: 'FETCH_PRODUCT',
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  }

  const fetchProductsByParams = (title, availability, category) => async () => {
    try {
      const res = await ProductDataService.getAll(title, availability, category);

      dispatch({
        type: 'FETCH_PRODUCTS',
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await ProductDataService.getAll();

      dispatch({
        type: 'FETCH_PRODUCTS',
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  }

  function removeProduct(id) {
    dispatch({
      type: 'REMOVE_PRODUCT',
      payload: id
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        productList: state.productList,
        selectedProduct: state.selectedProduct,
        addProduct,
        editProduct,
        fetchProduct,
        fetchProducts,
        fetchProductsByParams,
        removeProduct
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
