import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { TailSpin } from 'react-loading-icons'
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { Stack, HStack, VStack, Text, Box, Button, FormControl, FormLabel, Input, InputGroup, FormErrorMessage, Select } from '@chakra-ui/react';
import { getUser } from '../../utils/user/userSlice';

const Register = () => {
  const user = useSelector(getUser);
  const { field, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const renderContent = () => {
    switch (user){ 
      case null:
        return <TailSpin stroke="#3B0839"/>;
      case false:
        return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={5} fontSize="15px" color="black" bg="white">
              <FormControl id="email">
                <FormLabel>Email Address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Button fontSize="xl" isLoading={isSubmitting} onClick={onSubmit}>Register</Button>
            </Stack>
          </form>
        );
      default:
        return [
          <Navigate replace to='/'/>,
          <p>You are already logged in. Redirecting...</p>
        ];
    }
  }

  const onSubmit = async () => {
    console.log("Idk");
  }

  return (
    renderContent()
  )
}

export default Register;
