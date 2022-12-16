import { useState } from 'react';
import { Box, VStack, SimpleGrid } from '@chakra-ui/react'
import ProductList from '../../components/productList/ProductList';

const Search = () => {
  const [products, setProducts] = useState('');
  const getProductList = (productsData) => {
    setProducts(productsData);
  }
  
  const renderContent = () => {
    switch (products){ 
      case null:
        return <Box>Loading...</Box>;
      case false:
        return <Box>Error: Cannot fetch products</Box>;
      default:
        return <ProductList getProductList={getProductList}/>;
  }
}

  return (
    <VStack spacing="24px">
      <SimpleGrid columns={3} spacing={8} direction='row'>{renderContent()}</SimpleGrid>
    </VStack>
  )
}

export default Search;
