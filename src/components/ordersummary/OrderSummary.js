import { useSelector } from 'react-redux';
import { Heading, Text, Stack, HStack, VStack, Spacer, StackDivider, Image, } from '@chakra-ui/react'
import { getCart } from '../../utils/cart/cartSlice';

const OrderSummary = () => {
  const cart = useSelector(getCart);

  const getProductSubtotal = (product) => {
    return product.price * product.cartQuantity;
  }

  const getCartProducts = () => {
    return cart.map(product => (
      <HStack key={product.id} align="start" minWidth='100%'>
        <Image boxSize='150px' objectFit='contain' src={product.image} alt={product.title} />
        <Spacer />
        <VStack spacing={0}>
          <Text>{product.title}</Text>
          <Text>Qty: {product.cartQuantity}</Text>
        </VStack>
        <Spacer />
        <VStack spacing={0} align="end">
          <Text>${Number(getProductSubtotal(product)).toFixed(2)}</Text>
          <Text fontSize="12px">${Number(product.price).toFixed(2)}/Unit</Text>
        </VStack>
      </HStack>
    ));
  }

  // Shipping and tax not yet implemented
  return (
    <Stack divider={<StackDivider />}>
      <HStack align="end">
        <Heading size="md">Cart Items</Heading>
      </HStack>
      <VStack divider={<StackDivider />}>{getCartProducts()}</VStack>
    </Stack>
  )
}

export default OrderSummary;
