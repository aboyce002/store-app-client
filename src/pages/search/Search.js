import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { TailSpin } from 'react-loading-icons'
import { Box, VStack, SimpleGrid, Image, Text, Center } from '@chakra-ui/react'
import { makeGetFilteredProductList, fetchProducts, getProducts, getStatus } from '../../utils/products/productsSlice';
import ConditionText from '../../components/productcolors/ConditionText';
import RenderFromData from '../../components/renderfromdata/RenderFromData';

const Search = () => {
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]); // Array of param objects in key:value pairs ie: [id, 1] or [condition, new]
  const productList = useSelector(state => {
    if (searchParams)
      return makeGetFilteredProductList(state, { params: Object.keys(currentParams), paramValues: Object.values(currentParams) });
    else return getProducts(state);
  }, shallowEqual);

  useEffect(() => {
    dispatch(fetchProducts());
    console.log("product list: ", productList);
  }, [searchParams]);

  const renderProductList = () => {
    return (
      productList.map(product => (
        <Box key={product.id} alignItems='center' maxW={["200px", "400px"]}>
          <Link to={{
            pathname: "/product",
            search: "?id=" + product.id + "&title=" + product.title
          }}>
            <Image alt={product.title} src={product.image} boxSize={["200px", "400px"]} objectFit='cover' />
          </Link>
          <Box m={2}>
            <Center>
              <ConditionText productCondition={product.condition} />
            </Center>
            <Text>{product.title}</Text>
            <Text>${Number(product.price).toFixed(2)}</Text>
          </Box>
        </Box>
      )));
  }

  if (status === 'pending') return <TailSpin stroke="#3B0839" />;
  else if (!productList.length) return <Box>No search results found; please try searching again.</Box>
  else return (
    <SimpleGrid columns={{ base: 2, lg: 3 }} spacing={{ base: 2, lg: 8 }} direction='row'>
      <RenderFromData
        data={productList}
        ifNull={<Box>Error: Product not found.</Box>}
        ifFalse={<Box>Error: Cannot fetch products.</Box>}
        ifEmpty={<Box>No search results found; please try searching again.</Box>}
        ifExists={renderProductList()} />
    </SimpleGrid>
  )
}

export default Search;
