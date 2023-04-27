import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { Box, VStack, Image } from '@chakra-ui/react';
import { filterProductsByCategory, fetchProducts, getProducts } from '../../utils/products/productsSlice';

const ProductList = ({getProductList}) => {
  // Make this be able to hold products returned from whatever search parameters
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  let productsWithParams = useSelector(state => filterProductsByCategory(state, searchParams.get('category')));
  let productList = useSelector(getProducts);

  if (searchParams.get('category')) productList = productsWithParams;
  useEffect(() => {
    dispatch(fetchProducts());
    getProductList(productList);
    console.log("Product list dispatch");
  }, [searchParams]);

  // return productList.map(({id, title, description, category, image, price, quantity, condition, availability}) => (
  if(productList){
    return productList;
  }
  else return null;
}

export default ProductList;
