import { useEffect } from "react";
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Center, Flex, Link, SimpleGrid, Spacer, useToast, VStack } from '@chakra-ui/react';
import { addUserAddress } from '../../../utils/useraddress/userAddressSlice';
import AddressForm from "../../forms/addressform/AddressForm";
import { getCurrentUserId } from "../../../utils/user/userSlice";

const AddAddressModal = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const userId = useSelector(getCurrentUserId);
  const toast = useToast();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useOutletContext();

  useEffect(() => {
    setTitle("Add Address");
  }, [setTitle]);

  const onSubmit = async (address) => {
    console.log("Added address: ", address);

    dispatch(addUserAddress({ userId, address }))
      .then(result => {
        console.log("result: ", result);
        navigate('/checkout/addresses');
        return (
          toast({
            title: 'Address added',
            description: "You may now use this address in checkout.",
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <AddressForm register={register} errors={errors} />
        <SimpleGrid columns={3} spacing={3}>
          <Spacer />
          <Button type='submit'>Add Address</Button>
          <Flex>
            <Center>
              <Link as={ReactLink} to='/checkout/addresses' variant="text-link-blue" pb="4px">Back</Link>
            </Center>
          </Flex>
        </SimpleGrid>
      </VStack>
    </form>
  )
}

export default AddAddressModal;
