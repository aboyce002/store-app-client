import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { getProducts } from '../../utils/products/productsSlice';

const ProductList = () => {
  const productList = useSelector(getProducts);
  console.log("product from context: " + productList);

  if(productList){
    const products = productList.map(({id, title, description, category, image, price, quantity, condition, availability}) => (
    <Box w={350} key={id}>
      <Link to={{
        pathname: "/product",
        search: "?title=" + title
      }}>
        <img alt={title} src={image}/>
      </Link>
    </Box>
    ));

    return <SimpleGrid columns={3} spacing={8} direction='row'>{products}</SimpleGrid>
  }
  else return <p>No products were found.</p>
}

export default ProductList;
