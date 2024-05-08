import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, InputGroup, InputRightElement, InputLeftElement, FormControl, FormErrorMessage, HStack, IconButton } from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';
import { CurrentCategoryContext } from '../header/Header';
import SearchCategorySelect from './SearchCategorySelect';
import useDesktopSize from '../../hooks/useDesktopSize';

const SearchBar = ({ onClose }) => {
  const {categoryValue, setCategoryValue} = useContext(CurrentCategoryContext);
  const isDesktopSize = useDesktopSize();
  const navigate = useNavigate();
  const { field, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [searchValue, setSearchValue] = useState([]);

  const onSubmit = async () => {
    if (!isDesktopSize) onClose();
    console.log("category value is: ", categoryValue);
    navigate((categoryValue === undefined || categoryValue.length === 0) ? `/search?title=${searchValue}` : `/search?title=${searchValue}&category=${categoryValue}`);
  }

  const searchButton = () => {
    return <IconButton colorScheme='mainBlue' isLoading={isSubmitting} icon={<FiSearch />} onClick={onSubmit} borderLeftRadius="0" />
  }

  const renderCategorySelect = () => {
    if (isDesktopSize) {
      return (
        <InputLeftElement w={170}>
          <SearchCategorySelect />
        </InputLeftElement>
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <HStack spacing={0}>
          <InputGroup>
            {renderCategorySelect()}
            <Input {...field} placeholder='Search' id="search" variant='outline' style={isDesktopSize ? { textIndent: 140 } : null} color="black" bg="white"
              onChange={(event) => setSearchValue(event.target.value)} />
            <InputRightElement children={searchButton()} />
          </InputGroup>
          <FormErrorMessage name="search" component="div">{errors.name && errors.name.message}</FormErrorMessage>
        </HStack>
      </FormControl>
    </form>
  )
}

export default SearchBar;
