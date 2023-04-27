import React, { useState, useEffect } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import ProductDataService from "../../utils/services/productService";

const Products = () => {
  const [data, setData] = useState([]);

  /*useEffect(async () => {
    const response = await ProductDataService.getAll();

    setData(response.data);
  }, []);*/
  
  return (
    <>
      <h1>Products</h1>
        <HStack>
          {data.map(({ id, title, image }) => (
            <Box style={{width: '50px'}} key={`product-${id}`}>
              <img alt={title} src={image} />
            </Box>
          ))}
        </HStack>
    </>
  );
}
export default Products;
