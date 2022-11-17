import { React, useContext, useState, useEffect } from "react";
import { Box, HStack } from '@chakra-ui/react';
import { GlobalContext } from '../../utils/contexts/GlobalState';

const ProductList = () => {
  const { productList } = useContext(GlobalContext);
  console.log("product from context: " + productList);

  if(productList){
    const products = productList.map(({id, title, image}) => (
    <Box style={{width: '50px'}} key={id}>
      <img alt={title} src={image}/>
    </Box>
    ));

    return <HStack>{products}</HStack>;
  }
  else return <HStack><p>No products were found</p></HStack>
}

export default ProductList;
