import { Link as ReactLink, Outlet } from 'react-router-dom';
import { Box, Button, Heading, Grid, GridItem } from '@chakra-ui/react';
import AddressGrid from '../../../../../components/address/AddressGrid';

const AccountAddresses = () => {
  return (
    <>
      <Outlet />
      <Box py={5}>
        <Heading marginBottom="1.5rem">Addresses</Heading>
        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
          <AddressGrid />
          <GridItem colSpan={2}>
            <Button as={ReactLink} to='/account/addresses/add' colorScheme="mainBlue">
              New Address
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}

export default AccountAddresses;
