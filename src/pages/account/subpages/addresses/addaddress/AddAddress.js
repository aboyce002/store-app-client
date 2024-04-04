import { useSelector, useDispatch } from 'react-redux';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loading-icons'
import { useForm } from 'react-hook-form';
import { Box, Button, Center, Flex, Heading, Link, SimpleGrid, Spacer, Stack, Text, useToast } from '@chakra-ui/react';
import { getStatus, addUserAddress } from '../../../../../utils/useraddress/userAddressSlice';
import { getUser } from '../../../../../utils/user/userSlice';
import AddressForm from '../../../../../components/forms/addressform/AddressForm';
import RenderFromData from '../../../../../components/renderfromdata/RenderFromData';

const AddAddress = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const toast = useToast();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const status = useSelector(getStatus);
  const user = useSelector(getUser);

  const onSubmit = async (addressData) => {
    // Add user id to address data
    dispatch(addUserAddress({ userId: user.id, address: addressData }))
      .then(result => {
        console.log("result: ", result);
        return (
          toast({
            title: 'Address added',
            description: "You may now use this address in checkout.",
            status: 'success',
            duration: 4000,
            isClosable: true,
          }),
          navigate('/account/addresses'))
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
          <Heading marginBottom="1.5rem">Add Address</Heading>
          <Stack spacing={4}>
            <AddressForm register={register} errors={errors} />
          </Stack>
        </Box>

        <Stack direction={["column", "row"]} justify="center">
          <SimpleGrid columns={3} spacing={3}>
            <Spacer />
            <Button type='submit' colorScheme="mainPurple">Add Address</Button>
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
