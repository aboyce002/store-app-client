import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { TailSpin } from 'react-loading-icons'
import { Button, HStack, Link, GridItem, Stack, Text, VStack, Spacer, useToast } from '@chakra-ui/react';
import RenderFromData from '../renderfromdata/RenderFromData';
import { fetchAddressesForUser, getUserAddresses, getStatus } from '../../utils/useraddress/userAddressSlice';
import { getUser, updateUser } from '../../utils/user/userSlice';

const CheckoutAddressGrid = () => {
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
      <GridItem key={address.id} w="90%" bgColor={address.id === user.main_address ? "mainPurple.150" : "mainPurple.100"} boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.15)" borderRadius="10px">
        <Stack w="100%" spacing={0} px={8} py={2}>
          <HStack align="start">
            <VStack align="start" spacing={0}>
              <Text fontWeight="600">{address.first_name} {address.last_name}</Text>
              <Text>{address.street}</Text>
              <Text>{address.city}, {address.state} {address.zip}</Text>
              <Text>{address.country}</Text>
            </VStack>
            <Spacer />
            <Link as={ReactLink} to={'/checkout/addresses/edit/' + address.id.toString()} variant="text-link-blue">
              Edit
            </Link>
          </HStack>
          {address.id !== user.main_address &&
            <Button as={ReactLink} variant='link' onClick={() => makePrimaryAddress(address.id)}>Use this address</Button>
          }
        </Stack>
      </GridItem >
    ))
  };

  if (status === 'pending')
    return <TailSpin stroke="#3B0839" />;
  else
    return (
      <RenderFromData
        data={addressList}
        ifNull={<Text>Error retrieving addresses; please try again later.</Text>}
        ifFalse={<Text>Error retrieving addresses; please try again later.</Text>}
        ifEmpty={<Button as={ReactLink} to='/checkout/addresses' colorScheme="mainBlue"> Add Address </Button>}
        ifExists={renderAddresses()} />
    )
}

export default CheckoutAddressGrid;
