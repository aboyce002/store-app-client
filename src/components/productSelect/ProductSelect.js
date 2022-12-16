import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams  } from "react-router-dom";
import { Box, SimpleGrid} from '@chakra-ui/react'
import { getProductById } from '../../utils/products/productsSlice';

const ProductSelect = ({getProduct}) => {
  // Gets data of one product to display on the product page
  const [searchParams] = useSearchParams();
  const product = useSelector(state => getProductById(state, parseInt(searchParams.get('id'))));
  useEffect(() => {
    getProduct(product);
  });

  if(product){
    return <SimpleGrid columns={3} spacing={8} direction='row'>
      <Box w={350} key={product.id}>
        <img alt={product.title} src={product.image}/>
      </Box>
    </SimpleGrid>
  }
}

export default ProductSelect;
