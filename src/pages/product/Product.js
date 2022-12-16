import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, VStack, SimpleGrid, Button } from '@chakra-ui/react'
import { addToCart } from '../../utils/cart/cartSlice';
import ProductSelect from '../../components/productSelect/ProductSelect';

const Product = () => {
  const [product, setProduct] = useState('');
  const getProduct = (productData) => {
    setProduct(productData);
  }
  const dispatch = useDispatch();

  const renderProduct = () => {
    switch (product){ 
      case null:
        return <Box>Loading...</Box>;
      case false:
        return <Box>Error: Cannot fetch products</Box>;
      default:
        return <ProductSelect getProduct={getProduct}/>;
    }
  }

  // Change purchase button based on availability
  return (
    <VStack spacing="24px">
      <SimpleGrid columns={3} spacing={8} direction='row'>{renderProduct()}</SimpleGrid>
      <Box>{product.id}<br/>{product.title}<br/>{product.description}<br/>{product.category}<br/>
        {product.price}<br/>{product.quantity}<br/>{product.condition}<br/>{product.availability}</Box>
      <Link to="/cart" onClick={() => { dispatch(addToCart(product)) }}>
        <Button colorScheme='teal' variant='outline' >
          Add to cart
        </Button>
      </Link>
    </VStack>
  )
}

export default Product;
