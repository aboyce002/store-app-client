import { useSelector, useDispatch } from 'react-redux';
import { Heading, Text, Box, Stack, HStack, VStack, Spacer, StackDivider, Image, } from '@chakra-ui/react'
import { getCart, getTotalPrice, getTotalQuantity } from '../../utils/cart/cartSlice';

const OrderSummary = () => {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);
  const totalQuantity = useSelector(getTotalQuantity);

  const getProductSubtotal = (product) => {
    return product.price * product.cartQuantity;
  }

  const getCartProducts = () => {
    return cart.map(product => (
      <HStack key={product.id} align="start" minWidth='100%'>
        <Image boxSize='150px' objectFit='contain' src={product.image} alt={product.title} />
        <Spacer />
        <VStack spacing={1}>
          <Text>{product.title} x{product.cartQuantity}</Text>
        </VStack>
        <Spacer />
        <VStack spacing={1}>
          <Text fontWeight="400" fontSize="15px">${Number(getProductSubtotal(product)).toFixed(2)}</Text>
          <Text fontWeight="400" fontSize="11px">${Number(product.price).toFixed(2)}/Unit</Text>
        </VStack>
      </HStack>
    ));
  }

  return (
    <Stack divider={<StackDivider />}>
      <HStack align="end">
      <Heading size="md">Order Summary</Heading>
        <Spacer />
        <Box fontWeight="600" fontSize="18px">Price</Box>
      </HStack>
      <VStack divider={<StackDivider />}>{getCartProducts()}</VStack>
      <VStack fontSize="15px" py={2}>
        <Spacer />
        <Text>Subtotal ({Number(totalQuantity)} items): ${Number(totalPrice).toFixed(2)}</Text>
        <Text>Shipping & Handling: $</Text>
        <Text>Tax: $</Text>
        <Text fontWeight="600" fontSize="18px">Order Total: $</Text>
      </VStack>
    </Stack>
  )
}

export default OrderSummary;
