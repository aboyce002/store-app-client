import { useState } from "react";
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, InputGroup, Input, InputLeftElement, InputRightElement, Icon, Heading, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { FaLock } from "react-icons/fa";
import ConfirmationModal from '../../modals/confirmationmodal/ConfirmationModal';
import { getUser } from '../../../utils/user/userSlice';
import ShowPasswordToggleButton from "../../buttons/showpasswordtogglebutton/ShowPasswordToggle";

//setError('registerInput', { type: 'custom', message: 'custom message' });
const UpdatePasswordForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const user = useSelector(getUser);
  //const dispatch = useDispatch();
  let data = null;
  //const isEmpty = '';

  const onSubmit = async (accountData) => {
    data = accountData;
    onOpen();
    console.log("settings submitted");
    //const email = user.email;
    //dispatch(updateUser({ email, accountData }));
  };

  return (
    <>
      <ConfirmationModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} data={data} user={user} title="Update password" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box bg="secondary.card" rounded="lg" p={5}>
          <Stack spacing={0} marginTop="2rem" marginBottom="1.5rem">
            <Heading as="h4" size="md">
              Security settings
            </Heading>
            <Text color="gray.500" fontSize="md">
              Update your password
            </Text>
          </Stack>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel htmlFor="old_password">
                Current password
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  children={
                    <Icon as={FaLock} color="secondary.inputHelper" />
                  }
                />
                <Input focusBorderColor="main.500"
                  name="old_password"
                  id="old_password"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter your current password"
                  {...register("old_password", {
                    required: 'Please enter your current password',
                    validate: {
                      passwordMinRequirements: (value, formValues) => (value !== formValues.new_password) || 'Please do not use the same password'
                    }
                  })} />
                <InputRightElement width='3.5rem'>
                  <ShowPasswordToggleButton show={show} setShow={setShow} />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.old_password && errors.old_password.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="new_password">New password</FormLabel>
              <InputGroup>
                <InputLeftElement
                  children={
                    <Icon as={FaLock} color="secondary.inputHelper" />
                  }
                />
                <Input focusBorderColor="main.500"
                  name="new_password"
                  id="new_password"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter your new password"
                  {...register("new_password", {
                    required: 'Please enter your new password',
                    validate: {
                      passwordIsNotOld: (value, formValues) => (value !== formValues.old_password) || 'Please do not use the same password'
                    }
                  })} />
                <InputRightElement width='3.5rem'>
                  <ShowPasswordToggleButton show={show} setShow={setShow} />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.new_password && errors.new_password.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="new_password_confirm">
                Confirm new password
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  children={
                    <Icon as={FaLock} color="secondary.inputHelper" />
                  }
                />
                <Input focusBorderColor="main.500"
                  name="new_password_confirm"
                  id="new_password_confirm"
                  type={show ? 'text' : 'password'}
                  placeholder="Confirm your new password"
                  {...register("new_password_confirm", {
                    required: 'Please confirm your new password',
                    validate: {
                      passwordsMatch: (value, formValues) => (value === formValues.new_password) || 'Passwords do not match'
                    }
                  })} />
                <InputRightElement width='3.5rem'>
                  <ShowPasswordToggleButton show={show} setShow={setShow} />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.new_password_confirm && errors.new_password_confirm.message}</FormErrorMessage>
            </FormControl>
          </Stack>
        </Box>
        <Button type="submit" colorScheme="mainPurple">
          Change Password
        </Button>
      </form>
    </>
  )
}

export default UpdatePasswordForm;
