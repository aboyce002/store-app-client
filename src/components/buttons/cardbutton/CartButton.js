
import { Link as ReactLink } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { IconButton, Link } from '@chakra-ui/react';

const CartButton = () => {
  return (
    <Link as={ReactLink} to='/cart'>
      <IconButton aria-label='Cart' icon={<FiShoppingCart />} />
    </Link>
  )
}

export default CartButton;
