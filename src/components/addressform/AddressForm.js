import { FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react'

const AddressForm = () => {
  return ( <>
    <FormControl>
      <FormLabel>First Name</FormLabel>
      <Input type='text' />
    </FormControl>
    <FormControl>
      <FormLabel>Last Name</FormLabel>
      <Input type='text' />
    </FormControl>
    <FormControl>
      <FormLabel>Email</FormLabel>
      <Input type='email' />
      <FormHelperText>We'll never share your email.</FormHelperText>
    </FormControl>
    <FormControl>
      <FormLabel>Phone</FormLabel>
      <Input type='tel' />
    </FormControl>
    <FormControl>
      <FormLabel>Address 1</FormLabel>
      <Input type='text' />
    </FormControl>
    <FormControl>
      <FormLabel>Address 2</FormLabel>
      <Input type='text' placeholder='(SUITE#, APT.#, ETC)' />
    </FormControl>
    <FormControl>
      <FormLabel>City</FormLabel>
      <Input type='text'/>
    </FormControl>
    <FormControl>
      <FormLabel>State</FormLabel>
      <Input type='text'/>
    </FormControl>
    <FormControl>
      <FormLabel>Zip/Postal</FormLabel>
      <Input type='text'/>
    </FormControl>
    <FormControl>
      <FormLabel>Country</FormLabel>
      <Input type='text'/>
    </FormControl>
  </> )
}

export default AddressForm;
