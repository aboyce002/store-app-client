import { useSelector } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { Icon, IconButton, Link, Text } from '@chakra-ui/react';
import { getTotalQuantity } from '../../../utils/cart/cartSlice';

const CartButton = () => {
  const totalQuantity = useSelector(getTotalQuantity);

  return (
    <Link as={ReactLink} to='/cart' >
      <Icon fontSize='2xl' aria-label='Cart' as={FiShoppingCart} />
      <Text fontSize='2xl' textStyle="headingLinks" style={{ position: "absolute", transform: "translate(120%, -120%)" }}>{totalQuantity}</Text>
    </Link>
  )
}

export default CartButton;
