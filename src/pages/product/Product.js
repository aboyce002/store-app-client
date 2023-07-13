import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { TailSpin } from 'react-loading-icons'
import { Box, HStack, VStack, Image, Flex, Button, Heading, Text } from '@chakra-ui/react'
import { addToCart } from '../../utils/cart/cartSlice';
import { fetchProduct, getProduct, getStatus } from '../../utils/products/productsSlice';
import RenderFromData from '../../components/renderfromdata/RenderFromData';

const Product = () => {
  // Gets data of one product to display on the product page
  const dispatch = useDispatch();
  let status = useSelector(getStatus);
  const [searchParams] = useSearchParams();
  let product = useSelector(getProduct);

  useEffect(() => {
    dispatch(fetchProduct(searchParams.get('id')));
  }, []);

  const getAvailability = (product) => {
    if (product.availability !== "available")
      return (
        <Button colorScheme='red' disabled>Sold Out</Button>
      );
    else if (product.condition === "preorder")
      return (
        <Link to="/preorder">
          <Button colorScheme='mainPurple'>Preorder</Button>
        </Link>
      );
    else
      return (
        <Link to="/cart" onClick={() => { dispatch(addToCart(product)) }}>
          <Button>Add to Cart</Button>
        </Link>
      );
  }

  const renderProduct = () => {
    switch (product) {
      case null:
        return <Box>Error: Product not found.</Box>;
      case false:
        return <Box>Error: Cannot fetch product.</Box>;
      default:
        return (
          <Flex>
            <HStack spacing="24px">
              <VStack>
                <Box display="flex" key={product.id}>
                  <Image alt={product.title} src={product.image} maxW={{ base: "300px", lg: "600px" }} maxH={{ base: "300px", lg: "600px" }} objectFit='scale-down' />
                </Box>
                <HStack>
                  <Image alt={product.title} src={product.image} boxSize='60px' objectFit='cover' />
                </HStack>
              </VStack>
              <VStack>
                <Box><Heading>{product.title}</Heading></Box>
                <Box>${Number(product.price).toFixed(2)}</Box>
                <Box>{product.description}</Box>
                <Box>
                  {getAvailability(product)}
                </Box>
              </VStack>
            </HStack>
          </Flex>
        );
    }
  }

  // Change purchase button based on availability
  if (status === 'pending')
    return <TailSpin stroke="#3B0839" />;
  else return (
    renderProduct()
    /*
    <RenderFromData
      data={product}
      ifNull={<Box>Error: Product not found.</Box>}
      ifFalse={<Box>Error: Cannot fetch product.</Box>}
      ifExists={renderProduct()} />
    */
  )
}

export default Product;
