import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { TailSpin } from 'react-loading-icons'
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { Stack, Spacer, Flex, Box, HStack, Center, Text, Button, FormControl, FormLabel, Input, InputGroup, FormErrorMessage, Select } from '@chakra-ui/react'
import { getUser } from '../../utils/user/userSlice';

const LogIn = () => {
  const user = useSelector(getUser);
  const { field, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const renderContent = () => {
    switch (user){ 
      case null:
        return <TailSpin stroke="#3B0839"/>;
      case false:
        return (
          <Stack>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={5} fontSize="15px" color="black" bg="white">
                <FormControl id="username" isInvalid={errors.name}>
                  <FormLabel>Username</FormLabel>
                  <Input type="text"/>
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" />
                </FormControl>
                <Button fontSize="xl" isLoading={isSubmitting} onClick={onSubmit}>Log In</Button>
              </Stack>
            </form>
            <Box>            
            <a href="/auth/google">
              <Button w='full' variant='outline' leftIcon={<FcGoogle />}>
                <Center>
                  <Text>Sign in with Google</Text>
                </Center>
              </Button>
            </a>
            </Box>
          </Stack>
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

export default LogIn;
