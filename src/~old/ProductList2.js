import React from "react";
import { connect } from 'react-redux';
import { Box, HStack } from '@chakra-ui/react';

const ProductList = props => {
  console.log("product props: " + props.product);

  if(props.product){
      const products = props.product.map(({id, title, image}) => {
      return <Box style={{width: '50px'}} key={id}>
          <img alt={title} src={image}/>
        </Box>
    });

    return <HStack>{products}</HStack>;
  }
  else return <HStack><p>No products were found</p></HStack>
}

function mapStateToProps({ product }) {
  return { product };
}

export default connect(mapStateToProps)(ProductList);
