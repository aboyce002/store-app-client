import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { Link, Box, HStack, VStack, Image, Container, SimpleGrid, Heading, Flex, Spacer, Divider, Text } from '@chakra-ui/react';
import HomeCarousel from '../../components/carousels/homecarousel/HomeCarousel';
import RenderFromData from '../../components/renderfromdata/RenderFromData';
import { fetchProducts, makeGetFilteredProductList } from '../../utils/products/productsSlice';

const Homepage = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state => makeGetFilteredProductList(state, { params: ["condition"], paramValues: ["new"] }), shallowEqual);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const getLastSixNewestProducts = () => {
    const reversedProductList = productList.slice(0, 6);
    return reversedProductList.map(product => (
      <Box key={product.id}>
        <ReactLink to={{
          pathname: "/product",
          search: "?id=" + product.id + "&title=" + product.title
        }}>
          <Image alt={product.title} src={product.image} boxSize={["100px", "200px"]} objectFit='cover' />
        </ReactLink>
      </Box>
    ));
  }

  return (
    <Container my={-4} px={-[2, 10]} minW='100%' w='100%'>
      <Flex>
        <HomeCarousel position='relative' />
      </Flex>
      <VStack alignItems="start" p={4} bgColor="mainPurple.150">
        <HStack w='100%' alignItems="start">
          <Heading fontSize='25px' fontWeight="600">New!</Heading>
          <Spacer />
          <Link as={ReactLink} to={{ pathname: "/search", search: "?condition=new" }}>
            <HStack>
              <Heading fontSize='25px' fontWeight="600">View All</Heading>
            </HStack>
          </Link>
        </HStack>
        <Divider />
        <SimpleGrid columns={{ base: 2, sm: 3, lg: 6 }} spacing={4} alignItems="center">
          <RenderFromData
            data={productList}
            ifNull={<Text></Text>}
            ifFalse={<Text>Error retrieving products.</Text>}
            ifEmpty={<Text></Text>}
            ifExists={getLastSixNewestProducts()} />
        </SimpleGrid>
      </VStack>
    </Container>
  )
}

export default Homepage;
