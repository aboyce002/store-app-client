import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, InputGroup, InputRightElement, InputLeftElement, FormControl, FormErrorMessage, HStack, Select, IconButton } from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FiSearch } from 'react-icons/fi';

const SearchBar = () => {
  const navigate = useNavigate();
  const { field, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [searchValue, setSearchValue] = useState([]);
  const [categoryValue, setCategoryValue] = useState([]);

  const onSubmit = async () => {
    navigate((categoryValue === undefined || categoryValue.length == 0) ? `/search?title=${searchValue}` : `/search?title=${searchValue}&category=${categoryValue}`);
  }

  const select = () => {
    return <Select color='black' bgColor='#f2f2f2' placeholder='All Categories' onChange={(event) => {setCategoryValue( event.target.value )}} borderRightRadius="0">
      <option w='400px' value='charms'>Charms</option>
      <option w='400px' value='plushies'>Plushies</option>
      <option w='400px' value='prints'>Prints</option>
      <option w='400px' value='stickers'>Stickers</option>
    </Select>
  }

  const searchButton = () => {
    return <IconButton colorScheme='mainBlue' isLoading={isSubmitting} icon={<FiSearch />} onClick={onSubmit} borderLeftRadius="0"/>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <HStack spacing={0}>
          <InputGroup>
            <InputLeftElement w={170} children={select()}/>
            <Input {...field} placeholder='Search' id="search" variant='outline' style={{ textIndent: 140 }} color="black" bg="white"
            onChange={(event) => setSearchValue( event.target.value )}/>
            <InputRightElement children={searchButton()}/>
          </InputGroup>
          <FormErrorMessage name="search" component="div">{errors.name && errors.name.message}</FormErrorMessage>
        </HStack>
      </FormControl>
    </form>
  )
}

export default SearchBar;
