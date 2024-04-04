import { useSelector, useDispatch } from 'react-redux';
import { Link as ReactLink, useNavigate, useParams } from 'react-router-dom';
import { TailSpin } from 'react-loading-icons'
import { useForm } from 'react-hook-form';
import { Box, Button, Center, Flex, Heading, Link, SimpleGrid, Spacer, Stack, Text, useToast } from '@chakra-ui/react';
import { updateUserAddress, getAddressFromId, getStatus } from '../../../../../utils/useraddress/userAddressSlice';
import { getCurrentUserId } from '../../../../../utils/user/userSlice';
import AddressForm from '../../../../../components/forms/addressform/AddressForm';
import RenderFromData from '../../../../../components/renderfromdata/RenderFromData';

const EditAddress = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const toast = useToast();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { addressId } = useParams();
  const status = useSelector(getStatus);
  const userId = useSelector(getCurrentUserId);
  const address = useSelector(state => getAddressFromId(state, addressId));

  const onSubmit = async (addressData) => {
    dispatch(updateUserAddress({ id: address.id, userId: userId, address: addressData }))
      .then(result => {
        console.log("result: ", result);
        navigate('/account/addresses');
        return (
          toast({
            title: 'Address edited',
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
      })
  }

  const renderDataForAddress = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box bg="secondary.card" rounded="lg" p={5}>
          <Heading marginBottom="1.5rem">Edit Address</Heading>
          <Stack spacing={4}>
            <AddressForm register={register} errors={errors} addressData={address} />
          </Stack>
        </Box>

        <Stack direction={["column", "row"]} justify="center">
          <SimpleGrid columns={3} spacing={3}>
            <Spacer />
            <Button type='submit' colorScheme="mainPurple">Update Address</Button>
            <Flex>
              <Center>
                <Link as={ReactLink} to='/account/addresses' variant="text-link">Back</Link>
              </Center>
            </Flex>
          </SimpleGrid>
        </Stack>
      </form>
    )
  }

  if (status === 'pending') {
    return <TailSpin stroke="#3B0839" />;
  }
  else if (!address)
    return <Text>Address not found.</Text>
  else
    return (
      <RenderFromData
        data={address}
        ifNull={<Text>Address not found.</Text>}
        ifFalse={<Text>Error retrieving addresses; please try again later.</Text>}
        ifEmpty={<Text>Address not found.</Text>}
        ifExists={renderDataForAddress()} />
    )
}

export default EditAddress;
