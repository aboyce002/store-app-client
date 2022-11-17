import { useSelector } from 'react-redux';
import { Stack, Spacer, Flex, Box, VStack } from '@chakra-ui/react'
import ProductList from '../../components/productList/ProductList';
import { getProducts } from '../../utils/products/productsSlice';

const Search = () => {
  const productList = useSelector(getProducts);

  const renderContent = () => {
    switch (productList){ 
      case null:
        return <Box>Loading...</Box>;
      case false:
        return <Box>Error: Cannot fetch products</Box>;
      default:
        return <Box><ProductList/></Box>;
  }
}

  return (
    <VStack spacing="24px">
      {renderContent()}
    </VStack>
  )
}

export default Search;
