import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TailSpin } from 'react-loading-icons'
import { useForm } from 'react-hook-form';
import { Box, Button, Heading, Stack, VStack, Text } from '@chakra-ui/react';
import { fetchAddressesForUser, getUserAddresses, updateUserAddress, getStatus, getAddressFromId } from '../../../utils/useraddress/userAddressSlice';
import { getUser } from '../../../utils/user/userSlice';
import AddressForm from '../../../components/forms/addressform/AddressForm';
import RenderFromData from '../../../components/renderfromdata/RenderFromData';

const Address = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { addressId } = useParams();
  const status = useSelector(getStatus);
  const user = useSelector(getUser);
  const addressList = useSelector(getUserAddresses);
  const address = useSelector(state => getAddressFromId(state, addressId));

  useEffect(() => {
    if (!addressList.length && user?.main_address !== null) {
      if (user) {
        dispatch(fetchAddressesForUser(user.id));
      }
    }
  }, [addressId, user?.id]);

  const onSubmit = async (addressData) => {
    dispatch(updateUserAddress(addressData));
  }

  const renderDataForAddress = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box bg="secondary.card" rounded="lg" p={5}>
          <Heading marginBottom="1.5rem">Addresses</Heading>
          <VStack align="start" px={10} spacing={0}>
            <Text>{address.street}, </Text>
            <Text>{address.city}, {address.state} {address.zip}</Text>
            <Text>{address.country}</Text>
          </VStack>
          <Stack spacing={4}>
            <AddressForm />
          </Stack>
        </Box>

        <Stack direction={["column", "row"]} justify="center">
          <Button type="submit" colorScheme="mainPurple">
            Update address
          </Button>
        </Stack>
      </form>
    )
  }

  if (!address || status === 'pending') {
    return <TailSpin stroke="#3B0839" />;
  }
  else
    return (
      <RenderFromData
        data={address}
        ifNull={<Text>Address not found.</Text>}
        ifFalse={<Text>Error retrieving addresses; please try again later.</Text>}
        ifEmpty={<Text>Address not found?</Text>}
        ifExists={renderDataForAddress()} />
    )
}

export default Address;
