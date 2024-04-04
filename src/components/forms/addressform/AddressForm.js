import { FaRegUser } from "react-icons/fa";
import { FormControl, FormLabel, FormErrorMessage, GridItem, Input, InputGroup, InputLeftElement, Icon, Select, SimpleGrid, Spacer } from '@chakra-ui/react'

const AddressForm = ({ register, errors, addressData }) => {

  return (
    <SimpleGrid columns={2} columnGap={3} rowGap={3} w="full">
      <GridItem colSpan={1}>
        <FormControl id="firstName" name="firstName" isInvalid={errors.firstName}>
          <FormLabel>First Name</FormLabel>
          <InputGroup>
            <InputLeftElement children={<Icon as={FaRegUser} color="secondary.inputHelper" />} />
            <Input focusBorderColor="main.500" type="text" placeholder={addressData?.first_name || "John"}
              {...register("firstName", { required: true })} />
          </InputGroup>
          <FormErrorMessage>
            {errors.firstName && errors.firstName.type === "required" && (
              <span role="alert">Name field must be completed.</span>
            )}
          </FormErrorMessage>
        </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
        <FormControl id="lastName" name="lastName" isInvalid={errors.lastName}>
          <FormLabel>Last Name</FormLabel>
          <InputGroup>
            <InputLeftElement children={<Icon as={FaRegUser} color="secondary.inputHelper" />} />
            <Input focusBorderColor="main.500" type="text" placeholder={addressData?.last_name || "Doe"}
              {...register("lastName", { required: true })} />
          </InputGroup>
          <FormErrorMessage>
            {errors.lastName && errors.lastName.type === "required" && (
              <span role="alert">Name field must be completed.</span>
            )}
          </FormErrorMessage>
        </FormControl>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl id="address1" name="address1" isInvalid={errors.address1}>
          <FormLabel>Address 1</FormLabel>
          <Input type='text' placeholder={addressData?.street || null}
            {...register("address1", { required: true })} />
          <FormErrorMessage>
            {errors.address1 && errors.address1.type === "required" && (
              <span role="alert">Address field cannot be blank.</span>
            )}
          </FormErrorMessage>
        </FormControl>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl id="address2" name="address2" isInvalid={errors.address2}>
          <FormLabel>Address 2</FormLabel>
          <Input type='text' placeholder={addressData?.street2 || addressData ? null : '(SUITE#, APT.#, ETC)'}
            {...register("address2")} />
        </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
        <FormControl id="city" name="city" isInvalid={errors.city}>
          <FormLabel>City</FormLabel>
          <Input type='text' placeholder={addressData?.city || null}
            {...register("city", { required: true })} />
          <FormErrorMessage>
            {errors.city && errors.city.type === "required" && (
              <span role="alert">City cannot be blank.</span>
            )}
          </FormErrorMessage>
        </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
        <FormControl id="state" name="state" isInvalid={errors.state}>
          <FormLabel>State</FormLabel>
          <Input type='text' placeholder={addressData?.state || null}
            {...register("state", { required: true })} />
          <FormErrorMessage>
            {errors.state && errors.state.type === "required" && (
              <span role="alert">State cannot be blank.</span>
            )}
          </FormErrorMessage>
        </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
        <FormControl id="zipcode" name="zipcode" isInvalid={errors.zipcode}>
          <FormLabel>Zip/Postal</FormLabel>
          <Input type='text' placeholder={addressData?.zip || null}
            {...register("zipcode", { required: true })} />
          <FormErrorMessage>
            {errors.zipcode && errors.zipcode.type === "required" && (
              <span role="alert">Zip cannot be blank.</span>
            )}
          </FormErrorMessage>
        </FormControl>
      </GridItem>
      <Spacer />
      <GridItem colSpan={1}>
        <FormControl id="country" name="country" isInvalid={errors.country}>
          <FormLabel>Country</FormLabel>
          <Select defaultValue={addressData?.country || "US"}
            {...register("country", { required: true })}>
            <option value="AU">Australia</option>
            <option value="CA">Canada</option>
            <option value="CN">China</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
            <option value="IT">Italy</option>
            <option value="JP">Japan</option>
            <option value="ES">Spain</option>
            <option value="UK">United Kingdom</option>
            <option value="US">United States of America</option>
          </Select>
          <FormErrorMessage>
            {errors.country && errors.country.type === "required" && (
              <span role="alert">Country cannot be blank.</span>
            )}
          </FormErrorMessage>
        </FormControl>
      </GridItem>
    </SimpleGrid>
  )
}

export default AddressForm;
