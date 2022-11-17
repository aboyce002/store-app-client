import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, SimpleGrid} from '@chakra-ui/react'
import { GlobalContext } from '../../utils old/contexts/GlobalState';

const ProductSelect = () => {
  const { title, availability, category } = useParams();
  const { selectedProduct, fetchProductByParams } = useContext(GlobalContext);
  console.log("product fetched from API: " + selectedProduct);
  fetchProductByParams(title, availability, category);

  if(selectedProduct){
    const products = selectedProduct.map(({id, title, description, category, image, price, quantity, condition, availability}) => (
    <Box w={350} key={id}>
      <img alt={title} src={image}/>
    </Box>
    ));

    return <SimpleGrid columns={3} spacing={8} direction='row'>{products}</SimpleGrid>
  }

  /*
  const { productList, fetchProductByParams } = useContext(GlobalContext);
  let { productId } = useParams();
  let product = fetchProductByParams(`/api/products/${productId}`);
  */
}

export default ProductSelect;
