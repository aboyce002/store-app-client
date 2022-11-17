import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Box, Input, FormControl, FormErrorMessage, Form, Field, Button, SubmitButton, FormLabel, HStack, Select } from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FiSearch } from 'react-icons/fi';
import { fetchProducts, getProducts } from '../../utils/products/productsSlice';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState([]);
  const [categoryValue, setCategoryValue] = useState([]);
  const { field, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const productList = useSelector(getProducts);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    dispatch(fetchProducts());
    console.log("Products: " + productList);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HStack>
          <Box>
          <Select color='black' bgColor='white' placeholder='Select category' onChange={(event) => {setCategoryValue( event.target.value )}}>
            <option value='charms'>Charms</option>
            <option value='plushies'>Plushies</option>
            <option value='prints'>Prints</option>
            <option value='stickers'>Stickers</option>
          </Select>
          </Box>
          <Box>
              <FormControl isInvalid={errors.name}>
                <Input {...field} id="search" variant="outline" color="black" bg="white" onChange={(event) => {setSearchValue( event.target.value )}}/>
                <FormErrorMessage name="search" component="div"> {errors.name && errors.name.message} </FormErrorMessage>
              </FormControl>
          </Box>
          <Box>
            <Link to={{
              pathname: "/search",
              search: "?title=" + searchValue + "&category=" + categoryValue
            }} onClick={onSubmit}>
              <Button colorScheme='teal' isLoading={isSubmitting} bg="none">
                <FiSearch/>
              </Button>
            </Link>
          </Box>
      </HStack>
    </form>
  )
};

export default SearchBar;
