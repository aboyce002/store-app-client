import { useContext, useState } from 'react';
import { Select } from '@chakra-ui/react'
import { CurrentCategoryContext } from '../header/Header';

const SearchCategorySelect = () => {
  const [categoryValue, setCategoryValue] = useState("");

  // w='400px'
  const options = [
    { label: 'Charms', value: 'charms' },
    { label: 'Plushies', value: 'plushies' },
    { label: 'Prints', value: 'prints' },
    { label: 'Stickers', value: 'stickers' },
  ];

  return (
    <Select
      color='black'
      bgColor='#f2f2f2'
      placeholder='All Categories'
      value={categoryValue}
      onChange={(event) => { setCategoryValue(event.target.value) }}>
      <option value="charms">Charms</option>
      <option value="plushies">Plushies</option>
      <option value="prints">Prints</option>
      <option value="stickers">Stickers</option>
    </Select>
  )
}

export default SearchCategorySelect;
