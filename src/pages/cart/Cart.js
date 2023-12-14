import { Link as ReactLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Heading, Text, Box, Button, Stack, HStack, VStack, Link, Flex, Spacer, Grid, NumberInput, NumberInputField, StackDivider, Image } from '@chakra-ui/react'
import { incrementQuantity, decrementQuantity, changeQuantity, removeItem, getCart, getTotalPrice, getTotalQuantity } from '../../utils/cart/cartSlice';
import { BiPlus, BiMinus } from "react-icons/bi";

const Cart = () => {
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
          <Text>{product.title}</Text>
          <Text>Available: {product.quantity}</Text>
          <HStack>
            <Button colorScheme='gray' onClick={() => dispatch(decrementQuantity(product.id))}><BiMinus /></Button>
            <NumberInput
              width="100px"
              onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
              min={1}
              max={product.quantity}
              value={product.cartQuantity}
              onChange={(value) => dispatch(changeQuantity({ id: product.id, quantity: value }))}>
              <NumberInputField />
            </NumberInput>
            <Button colorScheme='gray' onClick={() => dispatch(incrementQuantity(product.id))}><BiPlus /></Button>
          </HStack>
          <Box>
            <Button colorScheme='gray' onClick={() => dispatch(removeItem(product.id))}>Remove</Button>
          </Box>
        </VStack>
        <Spacer />
        <VStack spacing={1}>
          <Text fontWeight="600" fontSize="18px">${Number(getProductSubtotal(product)).toFixed(2)}</Text>
          <Text fontWeight="400" fontSize="13px">${Number(product.price).toFixed(2)}/Unit</Text>
        </VStack>
      </HStack>
    ));
  }

  if (!cart || cart.length === 0) return (
    <VStack divider={<StackDivider />}>
      <Heading size='lg'>Cart</Heading>
      <Text>There's nothing in your cart; <Link as={ReactLink} to='/search' variant="text-link">add something to it!</Link></Text>
    </VStack>
  )
  else return (
    <Grid gridTemplateColumns={'1fr 2.5fr 1fr'} py={1} gap={4} w="100%">
      <Box></Box>
      <Stack divider={<StackDivider />}>
        <HStack align="end">
          <Heading size='lg'>Shopping Cart</Heading>
          <Spacer />
          <Box fontWeight="600" fontSize="18px">Price</Box>
        </HStack>
        <VStack divider={<StackDivider />}>{getCartProducts()}</VStack>
      </Stack>
      <Flex align="flex-start" justify="center">
        <VStack fontSize="18px" border="1px" borderRadius="md" borderColor="mainPurple.300" p={5} mt={10} position="sticky" top={100}>
          <Text>Subtotal ({Number(totalQuantity)} items): <b>${Number(totalPrice).toFixed(2)}</b>
          </Text>
          <Link as={ReactLink} to='/checkout'>
            <Button colorScheme='mainPurple'>Proceed To Payment</Button>
          </Link>
        </VStack>
      </Flex>
    </Grid>
  )
}

export default Cart;
