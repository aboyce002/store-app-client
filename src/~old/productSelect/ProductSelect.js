import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams, Link } from "react-router-dom";
import { addToCart } from '../../utils/cart/cartSlice';
import { Box, SimpleGrid, Image, VStack, Button } from '@chakra-ui/react'
import { getProductById, fetchProduct, getProduct} from '../../utils/products/productsSlice';

const ProductSelect = ({getSelectedProduct}) => {
  // Gets data of one product to display on the product page
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const product = useSelector(getProduct);
  
  useEffect(() => {
    dispatch(fetchProduct(searchParams.get('id')));
    getSelectedProduct(product);
    console.log("Product select dispatch");
  }, [searchParams]);

  if(product){
    return <VStack spacing="24px">
    <Box><Box w={350} key={product.id}>
      <Image alt={product.title} src={product.image} boxSize='350px' objectFit='cover'/>
    </Box><br/>{product.id}<br/>{product.title}<br/>{product.description}<br/>{product.category}<br/>
      {Number(product.price).toFixed(2)}<br/>{product.quantity}<br/>{product.condition}<br/>{product.availability}</Box>
    <Link to="/cart" onClick={() => { dispatch(addToCart(product)) }}>
      <Button variant='outline' >
        Add to cart
      </Button>
    </Link>
  </VStack>
  }
  else return null;
}

export default ProductSelect;
