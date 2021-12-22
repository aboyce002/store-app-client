import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stack, Spacer, Flex, Box, VStack } from '@chakra-ui/react'
import ProductList from '../../components/productList/ProductList';
import Products from '../../components/products/Products';

class Search extends Component {
  renderContent() {
    switch (this.props.product){ 
      case null:
        return <Box>Loading...</Box>;
      case false:
        return <Box>Error: Cannot fetch products</Box>;
      default:
        return <Box><ProductList/></Box>;
  }
}

  render() {
    return (
      <VStack spacing="24px">
        <Box><ProductList/></Box>;
        <Box><Products/></Box>;
      </VStack>
    )
  }
}

function mapStateToProps({ product }) {
  return { product };
}

export default connect(mapStateToProps)(Search);
