import { FETCH_PRODUCT, FETCH_PRODUCTS } from '../actions/types';

export default function productReducer(state = {}, action) {
  switch (action.type) {
    case "FETCH_PRODUCTS" || FETCH_PRODUCTS:
      //return action.payload || null; 
      console.log("Action products were fetched");
        //return {...state, productList: [...state.productList, action.payload]};
        return {productList: action.payload};
    case "FETCH_PRODUCT" || FETCH_PRODUCT:
      return action.payload || null;
    default:
      return state;
  }
}
