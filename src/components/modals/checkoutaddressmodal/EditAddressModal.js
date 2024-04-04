import { useEffect } from "react";
import { Link as ReactLink, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Center, Flex, Link, SimpleGrid, Spacer, Text, useToast, VStack } from '@chakra-ui/react';
import { getAddressFromId, updateUserAddress } from '../../../utils/useraddress/userAddressSlice';
import AddressForm from "../../forms/addressform/AddressForm";
import { getCurrentUserId } from "../../../utils/user/userSlice";
import RenderFromData from "../../renderfromdata/RenderFromData";

const EditAddressModal = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const toast = useToast();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { addressId } = useParams();
  const userId = useSelector(getCurrentUserId);
  const [title, setTitle] = useOutletContext();
  const address = useSelector(state => getAddressFromId(state, addressId));

  useEffect(() => {
    setTitle("Edit Address");
  }, [setTitle]);

  const onSubmit = async (addressData) => {
    dispatch(updateUserAddress({ id: address.id, userId: userId, address: addressData }))
      .then(result => {
        console.log("result: ", result);
        navigate('/checkout/addresses');
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

  const renderAddAddress = () => {
    return <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <AddressForm register={register} errors={errors} addressData={address} />
        <SimpleGrid columns={3} spacing={3}>
          <Spacer />
          <Button type='submit'>Edit Address</Button>
          <Flex>
            <Center>
              <Link as={ReactLink} to='/checkout/addresses' variant="text-link-blue" pb="4px">Back</Link>
            </Center>
          </Flex>
        </SimpleGrid>
      </VStack>
    </form>
  }

  const renderNotFound = () => {
    return (
      <>
        <Text align="center" mb={3}>Address not found.</Text>
        <Link as={ReactLink} to='/checkout/addresses' variant="text-link-blue">Back</Link>
      </>
    )
  }

  return (
    <RenderFromData
      data={address}
      ifNull={renderNotFound()}
      ifFalse={<><Text>Error fetching address.</Text> <Link as={ReactLink} to='/checkout/addresses' variant="text-link-blue">Back</Link></>}
      ifEmpty={renderNotFound()}
      ifExists={renderAddAddress()} />
  )
}

export default EditAddressModal;
