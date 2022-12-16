import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { filterProductsByCategory, getProducts } from '../../utils/products/productsSlice';

const ProductList = ({getProductList}) => {
  // Make this be able to hold products returned from whatever search parameters
  const [searchParams] = useSearchParams();
  const productList = useSelector(getProducts);
  // const productList = useSelector(state => filterProductsByCategory(state, searchParams.get('category')));
  // const productList = useSelector(getProducts);
  useEffect(() => {
    getProductList(productList);
  });
  // return productList.map(({id, title, description, category, image, price, quantity, condition, availability}) => (
  if(productList){
    return productList.map(product => (
    <Box w={350} key={product.id}>
      <Link to={{
        pathname: "/product",
        search: "?id=" + product.id + "&title=" + product.title
      }}>
        <img alt={product.title} src={product.image}/>
      </Link>
    </Box>
    ));
  }
  else return null;
}

export default ProductList;
