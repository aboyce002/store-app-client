import { useEffect } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TailSpin } from 'react-loading-icons'
import { Box, Button, HStack, Heading, Link, Grid, GridItem, Stack, Text, VStack, StackDivider } from '@chakra-ui/react';
import { fetchAddressesForUser, getUserAddresses, getStatus } from '../../../utils/useraddress/userAddressSlice';
import { getUser } from '../../../utils/user/userSlice';
import RenderFromData from '../../../components/renderfromdata/RenderFromData';

const AccountAddresses = () => {
  const dispatch = useDispatch();
  const addressList = useSelector(getUserAddresses);
  let status = useSelector(getStatus);
  const user = useSelector(getUser);

  useEffect(() => {
    console.log("user: ", user);
    if (user) dispatch(fetchAddressesForUser(user.id));
    else status = 'pending';
    console.log("address list: ", addressList);
  }, [user?.id]);

  const makePrimaryAddress = async (addressId) => {
    console.log("address made primary");
    //dispatch(updateUser({ email, accountData }));
  };

  const deleteAddress = async (addressId) => {
    console.log("address deleted");
    //dispatch(updateUser({ email, passwordData }));
  };

  const addAddress = async (address) => {
    console.log("address added");
    //const email = user.email;
    //dispatch(updateUser({ email, passwordData }));
  };

  const showPrimaryAddressLink = (address_id, user_address_id) => {
    if (address_id !== user_address_id) {
      return (
        <Link as={ReactLink} variant="text-link-blue" onClick={() => makePrimaryAddress(address_id)}>
          Make primary
        </Link>
      )
    }
    else return null;
  }

  const renderAddresses = () => {
    return addressList.map((address, index) => (
      <GridItem key={address.id} bgColor="mainPurple.150" boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.15)" borderRadius="10px">
        <Stack>
          <Heading as='h2' align="start" size='md' bgColor="mainBlue.200" p={2} px={10} borderTopRadius="10px">{address.id === user.main_address ? "Primary Address" : "Address " + (index + 1)}</Heading>
          <VStack align="start" px={10} spacing={0}>
            <Text>{address.street}</Text>
            <Text>{address.city}, {address.state} {address.zip}</Text>
            <Text>{address.country}</Text>
          </VStack>
          <HStack justify="center" p={1}
            divider={<StackDivider borderColor='mainBlue.500' />}
            bgColor="mainBlue.100"
            borderBottomRadius="10px">
            {showPrimaryAddressLink(address.id, user.main_address)}
            <Link as={ReactLink} to={address.id.toString()} variant="text-link-blue">
              Edit
            </Link>
            <Link as={ReactLink} variant="text-link-blue" colorScheme="red" onClick={() => deleteAddress(address.id)}>
              Delete
            </Link>
          </HStack>
        </Stack>
      </GridItem>
    ));
  }

  const renderAddressPage = () => {
    return (
      <Box py={5}>
        <Heading marginBottom="1.5rem">Addresses</Heading>
        <Grid columns={2} gap={6}>
          {renderAddresses()}
          <GridItem colSpan={2}>
            <Button as={ReactLink} to='/account/addresses/add' colorScheme="mainBlue" onClick={() => addAddress()}>
              Add Address
            </Button>
          </GridItem>
        </Grid>
      </Box>
    )
  }

  if (status === 'pending')
    return <TailSpin stroke="#3B0839" />;
  else
    return (
      <RenderFromData
        data={addressList}
        ifNull={<Text>Error retrieving addresses; please try again later.</Text>}
        ifFalse={<Text>Error retrieving addresses; please try again later.</Text>}
        ifEmpty={<Button colorScheme="mainBlue" onClick={() => addAddress()}> Add Address </Button>}
        ifExists={renderAddressPage()} />
    )
}

export default AccountAddresses;
