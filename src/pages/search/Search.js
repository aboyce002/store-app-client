import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { TailSpin } from 'react-loading-icons'
import { Box, VStack, SimpleGrid, Image, Text, Center, useBreakpoint } from '@chakra-ui/react'
import { filterProductsBySearchParams, fetchProducts, getProducts, getStatus } from '../../utils/products/productsSlice';

const Search = () => {
  const dispatch = useDispatch();
  let status = useSelector(getStatus);
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]); // Array of param objects in key:value pairs ie: [id, 1] or [condition, new]
  let productList = useSelector(state => {
      if (searchParams)
        return filterProductsBySearchParams(state, Object.keys(currentParams), Object.values(currentParams));
      else return getProducts(state);
    }
  );

  useEffect(() => {
    dispatch(fetchProducts());
    console.log("Current param key: ", Object.keys(currentParams)[0]);
    console.log("Current param value: ", searchParams.get(Object.keys(currentParams)[0]))
  }, [searchParams]);

  const displayConditionColor = (product) => {
    if (product.condition === 'new')
      return <Text w={{base: '100%', lg: '50%'}} color='white' bgColor="#66ADEA">New!</Text>
    else if (product.condition === 'preorder')
      return <Text w={{base: '100%', lg: '50%'}} color='white' bgColor='#D16F7F'>Preorder</Text>
    else return;
  }

  const renderProductList = () => {
    switch (productList){ 
      case null:
        return <Box>Error: Product not found.</Box>;
      case false:
        return <Box>Error: Cannot fetch products</Box>;
      default:
        return ( 
          productList.map(product => (
          <Box key={product.id}>
            <Link to={{
              pathname: "/product",
              search: "?id=" + product.id + "&title=" + product.title
            }}>
              <Image alt={product.title} src={product.image} boxSize={["150px", "350px"]} objectFit='cover'/>
            </Link>
            <Box m={2}>
              <Center>{displayConditionColor(product)}</Center>
              <Text>{product.title}</Text>
              <Text>${Number(product.price).toFixed(2)}</Text>
            </Box>
          </Box>
        )));
    }
  }

  if (productList.length === 0)
    return <Box>No search results found; try searching again</Box>;
  else if (status === 'pending') 
    return <TailSpin stroke="#3B0839"/>;
  else return (
    <VStack spacing="24px">
      <SimpleGrid columns={{base: 2, lg: 3}} spacing={8} direction='row'>{renderProductList()}</SimpleGrid>
    </VStack>
  )
}

export default Search;
