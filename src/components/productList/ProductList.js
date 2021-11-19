import React from "react";
import { Box, HStack } from '@chakra-ui/react'

const ProductList = props => {
  console.log(props.productList);

  const products = props.productList.map(({id, title, image}) => {
    return <Box style={{width: '50px'}} key={id}>
        <img alt={title} src={image}/>
      </Box>
  });

  return <HStack>{products}</HStack>;
};

export default ProductList;
