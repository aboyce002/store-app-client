import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { TailSpin } from 'react-loading-icons'
import { Button, HStack, Heading, Link, GridItem, Stack, Text, VStack, StackDivider, useToast } from '@chakra-ui/react';
import RenderFromData from '../renderfromdata/RenderFromData';
import { fetchAddressesForUser, getUserAddresses, getStatus } from '../../utils/useraddress/userAddressSlice';
import { getUser, updateUser } from '../../utils/user/userSlice';

const AddressGrid = () => {
  const toast = useToast();
  const status = useSelector(getStatus);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const addressList = useSelector(getUserAddresses);

  useEffect(() => {
    if (user) dispatch(fetchAddressesForUser(user.id));
  }, [user, dispatch]);

  const makePrimaryAddress = async (addressId) => {
    dispatch(updateUser({ id: user.id, data: { main_address: addressId } }))
      .then(result => {
        return (
          toast({
            title: 'Primary address changed',
            status: 'success',
            duration: 4000,
            isClosable: true,
          }))
      })
      .catch(error => {
        return (
          toast({
            title: 'Error',
            description: error.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          }))
      });
  };

  const renderAddresses = () => {
    // Order so main address shows up first
    const addressListList = [...addressList];
    const addresses = [...addressListList.splice(addressListList.findIndex((address) => address.id === user.main_address)), ...addressListList];
    return addresses.map((address, index) => (
      <GridItem key={address.id} bgColor="mainPurple.150" boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.15)" borderRadius="10px">
        <Stack w="full" h="full">
          <Heading as='h2' align="start" size='md' bgColor="mainBlue.200" p={2} px={10} borderTopRadius="10px">{address.id === user.main_address ? "Primary Address" : "Address " + (index + 1)}</Heading>
          <VStack align="start" px={10} spacing={0}>
            <Text>{address.first_name} {address.last_name}</Text>
            <Text>{address.street}</Text>
            <Text>{address.city}, {address.state} {address.zip}</Text>
            <Text>{address.country}</Text>
          </VStack>
          <HStack justify="center" p={1}
            divider={<StackDivider borderColor='mainBlue.500' />}
            bgColor="mainBlue.100"
            borderBottomRadius="10px">
            {address.id !== user.main_address &&
              <Link as={ReactLink} variant="text-link-blue" onClick={() => makePrimaryAddress(address.id)}>
                Make primary
              </Link>}
            <Link as={ReactLink} variant="text-link-blue" to={'/account/addresses/edit/' + address.id.toString()}>
              Edit
            </Link>
            <Link as={ReactLink} variant="text-link-blue" to={'/account/addresses/delete/' + address.id.toString()}>
              Remove
            </Link>
          </HStack>
        </Stack>
      </GridItem>
    ));
  }

  if (status === 'pending')
    return <TailSpin stroke="#3B0839" />;
  else
    return (
      <RenderFromData
        data={addressList}
        ifNull={<Text>Error retrieving addresses; please try again later.</Text>}
        ifFalse={<Text>Error retrieving addresses; please try again later.</Text>}
        ifEmpty={<Button as={ReactLink} to='/account/addresses/add' colorScheme="mainBlue">New Address</Button>}
        ifExists={renderAddresses()} />
    )
}

export default AddressGrid;
