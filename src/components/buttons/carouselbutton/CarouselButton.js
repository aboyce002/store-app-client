import { Link as ReactLink } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { IconButton, Link } from '@chakra-ui/react';

const CartButton = () => {
  return (
    <IconButton
      aria-label="left-arrow"
      fontSize={arrowSize}
      height="100%"
      color="white"
      variant="ghost"
      border-radius="0px"
      position="absolute"
      left={side}
      top={top}
      transform={'translate(0%, -50%)'}
      zIndex={2}
      onClick={() => slider?.slickPrev()}/>
      )
}

      export default CartButton;
