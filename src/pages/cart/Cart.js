import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Divider, Heading, Text, Box, Button, Stack, HStack, VStack, Flex, Spacer, Grid, Input, NumberInput, NumberInputField, StackDivider, Image } from '@chakra-ui/react'
import { incrementQuantity, decrementQuantity, changeQuantity, removeItem, getCart, getCartItemById, getTotalPrice, getTotalQuantity } from '../../utils/cart/cartSlice';
import { BiRightArrowAlt, BiPlus, BiMinus } from "react-icons/bi";
import { TiArrowRightThick } from "react-icons/ti";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);
  const totalQuantity = useSelector(getTotalQuantity);

  const getProductSubtotal = (product) => {
    return product.price*product.cartQuantity;
  }

  const getCartProducts = () => {
    return cart.map(product => (
      <HStack key={product.id} align="start" minWidth='100%'>
        <Image boxSize='150px' objectFit='contain' src={product.image} alt={product.title}/>
        <Spacer />
        <VStack spacing={1}>
          <Text>{product.title}</Text>
          <Text>Available: {product.quantity}</Text>
          <HStack>
            <Button colorScheme='gray' onClick={() => dispatch(decrementQuantity(product.id))}><BiMinus/></Button>
              <NumberInput 
                width="100px"
                onKeyDown={(e) =>["e", "E", "+", "-"].includes(e.key) && e.preventDefault()} 
                min={1} 
                max={product.quantity}
                value={product.cartQuantity} 
                onChange={(value) => dispatch(changeQuantity({id: product.id, quantity: value}))}>
                <NumberInputField />
              </NumberInput>
            <Button colorScheme='gray' onClick={() => dispatch(incrementQuantity(product.id))}><BiPlus/></Button>
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
      <Heading as='h2' size='lg'>Cart</Heading>
      <Text>Cart is empty.</Text>
    </VStack>
  )
  else return (
      <Grid gridTemplateColumns={'1fr 7fr 1fr'} py={1} gap={4}>
        <Box></Box>
        <Stack divider={<StackDivider />}>
          <HStack align="end">
            <Heading as='h2' size='lg' align="left">Shopping Cart</Heading>
            <Spacer />
            <Box fontWeight="600" fontSize="18px">Price</Box>
          </HStack>
          <VStack divider={<StackDivider />}>{getCartProducts()}</VStack>
          <HStack fontSize="18px" py={2}>
              <Spacer />
              <Text>Subtotal ({Number(totalQuantity)} items):</Text> 
              <Text fontWeight="600">${Number(totalPrice).toFixed(2)}</Text>
          </HStack>
        </Stack>
        <Flex align="flex-end">
          <Link to='/checkout'>
            <Button colorScheme='mainPurple' rightIcon={<TiArrowRightThick />} justify="flex-start">Checkout</Button>
          </Link>
        </Flex>
      </Grid>
  )
}

export default Cart;
