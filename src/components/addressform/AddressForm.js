import { Button, Checkbox, FormControl, FormLabel, GridItem, Input, Select, SimpleGrid } from '@chakra-ui/react'

const AddressForm = () => {
  return (
    <SimpleGrid columns={2} columnGap={3} rowGap={3} w="full">
      <GridItem colSpan={1}>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input type='text' />
        </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input type='text' />
        </FormControl>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type='email' />
        </FormControl>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input type='tel' />
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
