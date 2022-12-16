import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Heading, Text, Box, Button, HStack, VStack } from '@chakra-ui/react'
import { incrementQuantity, decrementQuantity, removeItem, getCart } from '../../utils/cart/cartSlice';
import { BiRightArrowAlt, BiPlus, BiMinus } from "react-icons/bi";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  console.dir("cart: " + cart);

  const getCartProducts = () => {
    return cart.map(product => (
      <HStack key={product.id}>
        <Box w={150}>
          <img alt={product.title} src={product.image}/>
        </Box>
        <VStack>
          <Box>{product.title}</Box>
          <Box>In stock: {product.quantity}</Box>
          <HStack>
            <Button onClick={() => dispatch(decrementQuantity(product.id))}><BiMinus/></Button>
              <Text>{product.cartQuantity}</Text>
            <Button onClick={() => dispatch(incrementQuantity(product.id))}><BiPlus/></Button>
          </HStack>
          <Box>
            <Button onClick={() => dispatch(removeItem(product.id))}>Remove</Button>
          </Box>
        </VStack>
        <Box>{product.price}</Box>
      </HStack>
    ));
  }
  const getTotals = () => {
    let totalQuantity = 0
    let totalPrice = 0
    cart.forEach(item => {
      totalQuantity += item.cartQuantity
      totalPrice += item.price * item.cartQuantity
    })
    return {totalPrice, totalQuantity}
  }
  
  if (!cart || cart.length === 0) return <VStack><Heading as='h2' size='lg'>Cart</Heading><br/><Text>Cart is empty.</Text></VStack>
  else return (
    <div>
      <Heading as='h2' size='lg'>Cart</Heading>
      <VStack>{getCartProducts()}</VStack>
      <VStack>
        <Box><Text>Items: {getTotals().totalQuantity}</Text></Box>
        <Box><Text>Total: ${getTotals().totalPrice}</Text></Box>
      <Link to='/checkout'>
        <Button rightIcon={<BiRightArrowAlt/>} colorScheme='teal' variant='outline'>
          Checkout
        </Button>
      </Link>
      </VStack>
    </div>
  )
}

export default Cart;
