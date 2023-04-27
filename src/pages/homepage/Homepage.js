import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { Link, Box, HStack, VStack, Image, Container, SimpleGrid, Heading, Text, Flex, Stack, Center, useBreakpoint } from '@chakra-ui/react';
import { BiRightArrowAlt } from 'react-icons/bi';
import Carousel from '../../components/carousel/Carousel';
import { filterProductsBySearchParams, fetchProducts, getStatus } from '../../utils/products/productsSlice';

const Homepage = () => {
  const dispatch = useDispatch();
  let productList = useSelector(state => filterProductsBySearchParams(state, ["condition"], ["new"]));
  let status = useSelector(getStatus);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const getLastFiveNewestProducts = () => {
    const reversedProductList = productList.slice(0, 5);
    return reversedProductList.map(product => (
      <Box key={product.id}>
        <ReactLink to={{
          pathname: "/product",
          search: "?id=" + product.id + "&title=" + product.title
        }}>
          <Image alt={product.title} src={product.image} boxSize={["100px", "200px"]} objectFit='cover'/>
        </ReactLink>
      </Box>
    ));
  }

  return (
    <Container my={-4} minW='100%'>
      <Flex>
        <Box position='absolute' zIndex='1' bgImage='url(http://placekitten.com/610/600)' bgGradient='linear(to-r, rgba(167,207,223,0) 0%, rgba(35,83,138,0.95) 100%)'>
          <Text>AAAAAAA</Text>
        </Box>
        <Carousel position='relative'/>
      </Flex>
      <Center>
        <VStack alignItems="start" p={4}>
          <Heading>New</Heading>
          <SimpleGrid columns={{base: 2, lg: 6}} spacing={4} alignItems="center">
            {getLastFiveNewestProducts()}
            <Link as={ReactLink} to={{ pathname: "/search", search: "?condition=new"}}>
              <HStack>
              <Heading>View All</Heading> 
              <BiRightArrowAlt fontSize="40px"/>
              </HStack>
            </Link>
          </SimpleGrid>
        </VStack>
      </Center>
    </Container>
  )
}

export default Homepage;
