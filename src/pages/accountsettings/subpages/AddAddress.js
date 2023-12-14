import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TailSpin } from 'react-loading-icons'
import { useForm } from 'react-hook-form';
import { Box, Button, Heading, Stack, VStack, Text } from '@chakra-ui/react';
import { fetchAddressesForUser, updateUserAddress, getStatus, addUserAddress } from '../../../utils/useraddress/userAddressSlice';
import { getUser } from '../../../utils/user/userSlice';
import AddressForm from '../../../components/forms/addressform/AddressForm';
import RenderFromData from '../../../components/renderfromdata/RenderFromData';

const AddAddress = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const user = useSelector(getUser);
  const userId = user.id;

  const onSubmit = async (addressData) => {
    dispatch(addUserAddress(addressData));
  }

  const renderDataForAddress = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box bg="secondary.card" rounded="lg" p={5}>
          <Heading marginBottom="1.5rem">Add Address</Heading>
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

  if (!user || status === 'pending') {
    return <TailSpin stroke="#3B0839" />;
  }
  else
    return (
      <RenderFromData
        data={user}
        ifNull={<Text>Address not found.</Text>}
        ifFalse={<Text>Error retrieving addresses; please try again later.</Text>}
        ifEmpty={<Text>Address not found?</Text>}
        ifExists={renderDataForAddress()} />
    )
}

export default AddAddress;
