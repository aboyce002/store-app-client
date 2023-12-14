import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { Box, VStack, Image } from '@chakra-ui/react';
import { fetchProducts, getProducts, getProductById, filterProductsByCategory } from '../../utils/products/productsSlice';

const ProductFetch = ({getProductFetch}) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    // Array of param objects in key:value pairs ie: [id, 1], [condition, new]
    const currentParams = Object.fromEntries([...searchParams]);
    // Make this be able to hold products returned from whatever search parameters
    const productList = useSelector(state => {
        if(searchParams.get('id'))
          return getProductById(state, parseInt(searchParams.get('id')))
        else if (searchParams)
          return filterProductsByCategory(state, searchParams.get('category'));
        else return getProducts(state);
      }
    );

  useEffect(() => {
    dispatch(fetchProducts());
    getProductFetch(productList);
  }, []);

  // return productList.map(({id, title, description, category, image, price, quantity, condition, availability}) => (
  if(searchParams.get('id'))
    return <Box w={350} key={productList.id}>
      <Image alt={productList.title} src={productList.image} boxSize='350px' objectFit='cover'/>
    </Box>
  else if(productList) {
    return productList.map(product => (
    <VStack key={product.id}>
      <Link to={{
        pathname: "/product",
        search: "?id=" + product.id + "&title=" + product.title
      }}>
        <Image alt={product.title} src={product.image} boxSize={["150px", "350px"]} objectFit='cover'/>
      </Link>
      <Box>{product.title}</Box>
      <Box>${Number(product.price).toFixed(2)}</Box>
    </VStack>
    ));
  }
  else return null;
}

export default ProductFetch;
