import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Box, Button, Divider, FormControl, FormErrorMessage, FormLabel, InputGroup, Input, InputLeftElement, Icon, Heading, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { FaRegEnvelope, FaLock } from "react-icons/fa";
import ConfirmationModal from '../../modals/confirmationmodal/ConfirmationModal';
import { getUser, updateUser } from '../../../utils/user/userSlice';

//setError('registerInput', { type: 'custom', message: 'custom message' });
const AccountSettingsForm = () => {
  const { register, getValues, handleSubmit, setError, formState: { errors } } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  let data = null;
  //const dispatch = useDispatch();
  //const isEmpty = '';

  const onSubmit = async (accountData) => {
    onOpen();
    data = accountData;
    console.log("settings submitted");
    //const email = user.email;
    //dispatch(updateUser({ email, accountData }));
  };

  const handleModalConfirm = () => {
    let id = user.id;
    if (dispatch(updateUser({ id, data }))) {
      return (
        toast({
          title: 'Settings changed',
          description: "Account settings have been updated.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      )
    }
  }

  return (
    <>
      <ConfirmationModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}
        title="Change account settings"
        error="There was an error updating your account."
        onConfirm={handleModalConfirm} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box bg="secondary.card" rounded="lg" p={5}>
          <Stack spacing={0} marginBottom="1rem">
            <Heading marginBottom="1.5rem">Edit profile</Heading>
            <Heading as="h4" size="md">
              Account settings
            </Heading>
            <Text color="gray.500" fontSize="md">
              Change your email
            </Text>
          </Stack>
          <Stack spacing={4}>
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <InputGroup>
                <InputLeftElement children={<Icon as={FaRegEnvelope} color="secondary.inputHelper" />} />
                <Input focusBorderColor="main.500" type="email" name="email" id="email" placeholder={(user && user.email) ? user.email : "name@example.com"} autoComplete="email"
                  {...register("email", { required: 'Please enter your email', pattern: /^\S+@\S+$/i })} />
              </InputGroup>
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>
          </Stack>
        </Box>
        <Button type="submit" colorScheme="mainPurple">
          Update settings
        </Button>
      </form>
    </>
  )
}

export default AccountSettingsForm;
