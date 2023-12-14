import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FaRegEnvelope, FaLock, FaRegUser } from "react-icons/fa";
import { Button, Checkbox, FormControl, FormLabel, GridItem, Input, InputGroup, InputLeftElement, Icon, Select, SimpleGrid } from '@chakra-ui/react'
import { getUser, updateUser } from '../../../utils/user/userSlice';

const AddressForm = ({ formId }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const user = useSelector(getUser);

  return (
    <SimpleGrid columns={2} columnGap={3} rowGap={3} w="full">
      <GridItem colSpan={1}>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <InputGroup>
            <InputLeftElement children={<Icon as={FaRegUser} color="secondary.inputHelper" />} />
            <Input focusBorderColor="main.500" type="text" name="firstName" id="firstName" placeholder="John Doe"
              {...register("firstName", { required: true })} />
          </InputGroup>
        </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <InputGroup>
            <InputLeftElement children={<Icon as={FaRegUser} color="secondary.inputHelper" />} />
            <Input focusBorderColor="main.500" type="text" name="lastName" id="lastName" placeholder="John Doe"
              {...register("lastName", { required: true })} />
          </InputGroup>
        </FormControl>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <InputLeftElement children={<Icon as={FaRegEnvelope} color="secondary.inputHelper" />} />
            <Input focusBorderColor="main.500" type="email" name="email" id="email" placeholder={(user && user.email) ? user.email : "name@example.com"}
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
          </InputGroup>
        </FormControl>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>Phone</FormLabel>
          <InputGroup>
            <InputLeftElement children={<Icon as={FaRegEnvelope} color="secondary.inputHelper" />} />
            <Input focusBorderColor="main.500" type="tel" name="phone" id="phone" placeholder={(user && user.phone) ? user.phone : "Phone Number"}
              {...register("phone", { required: true, pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im })} />
          </InputGroup>
        </FormControl>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>Address 1</FormLabel>
          <Input type='text' />
        </FormControl>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>Address 2</FormLabel>
          <Input type='text' placeholder='(SUITE#, APT.#, ETC)' />
        </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
        <FormControl>
          <FormLabel>City</FormLabel>
          <Input type='text' />
        </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
        <FormControl>
          <FormLabel>State</FormLabel>
          <Input type='text' />
        </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
        <FormControl>
          <FormLabel>Zip/Postal</FormLabel>
          <Input type='text' />
        </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
        <FormControl>
          <FormLabel>Country</FormLabel>
          <Input type='text' />
        </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
        <FormControl>
          <FormLabel>Country</FormLabel>
          <Select>
            <option value="usa">United States of America</option>
            <option value="uae">United Arab Emirates</option>
            <option value="nmk">North Macedonia</option>
            <option value="de">Germany</option>
          </Select>
        </FormControl>
      </GridItem>
    </SimpleGrid>
  )
}

export default AddressForm;
