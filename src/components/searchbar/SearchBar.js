import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, withRouter } from 'react-router-dom';
import * as actions from "../../utils/actions";
import { Box, Input, FormControl, FormErrorMessage, Form, Field, Button, SubmitButton, FormLabel, HStack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FiSearch } from 'react-icons/fi';
import fakeStoreApi from '../../api/fakeStoreApi';
import ProductList from '../productList/ProductList';

const SearchBar = () => {
  //state = {term: '', productList: []};

  //products: this.props.fetchProduct();
  const [searchValue, setSearchValue] = useState([]);
  const [products, setProducts] = useState([]);
  const { field, register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async term =>  {
    const response = await fakeStoreApi.get('/products', {
      //use searchValue here
      //params: { query: this.state.term }
    });
    console.log(response.data);
    setProducts(response.data);
    console.log("Products: " + products);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HStack>
          <Box>
              <FormControl isInvalid={errors.name}>
                <Input {...field} id="search" variant="outline" color="black" bg="white" onChange={(event) => {setSearchValue( event.target.value )}}/>
                <FormErrorMessage name="search" component="div"> {errors.name && errors.name.message} </FormErrorMessage>
              </FormControl>
          </Box>
          <Box>
            <Button colorScheme='teal' isLoading={isSubmitting} bg="none" type="submit">
              <FiSearch/>
            </Button>
          </Box>
      </HStack>
    </form>
  )
};
//<ProductList productList={this.state.productList}/>
export default connect(null, actions)(withRouter(SearchBar));
