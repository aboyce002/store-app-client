import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { Link, Box, HStack, VStack, Image, Container, SimpleGrid, Heading, Text, Flex, Stack, Center, useBreakpoint, Spacer, Divider } from '@chakra-ui/react';
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
        <Carousel position='relative' />
      </Flex>
      <VStack alignItems="start" p={4} bgColor="mainPurple.150">
        <HStack w='100%' alignItems="start">
          <Heading fontSize='25px' fontWeight="600">New!</Heading>
          <Spacer />
          <Link as={ReactLink} to={{ pathname: "/search", search: "?condition=new" }}>
            <HStack>
              <Heading fontSize='25px' fontWeight="600">View All</Heading>
              <BiRightArrowAlt fontSize="25px" />
            </HStack>
          </Link>
        </HStack>
        <Divider />
        <SimpleGrid columns={{ base: 2, sm: 3, lg: 6 }} spacing={4} alignItems="center">
          {getLastFiveNewestProducts()}
        </SimpleGrid>
      </VStack>
    </Container>
  )
}

export default Homepage;
