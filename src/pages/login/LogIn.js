import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { Stack, Box, Center, Text, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { getUser, loginUser } from '../../utils/user/userSlice';
import RenderFromData from '../../components/renderfromdata/RenderFromData';

const LogIn = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const { field, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [email, setEmailValue] = useState(null);
  const [password, setPasswordValue] = useState(null);

  const onSubmit = async () => {
    dispatch(loginUser(email, password));
  }

  const redirect = () => {
    return (
      <Navigate replace to='/' />,
      <Text>You are already logged in. Redirecting...</Text>
    );
  }

  // ADD PASSWORD CHARACTER LIMIT
  // and also maybe requirements
  // please
  // thank
  const renderContent = () => {
    return (
      <Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5} fontSize="15px" color="black" bg="white">
            <FormControl id="username" isInvalid={errors.name}>
              <FormLabel>Username</FormLabel>
              <Input type="text" />
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
  }

  return (
    <RenderFromData
      data={user}
      ifFalse={renderContent()}
      ifExists={redirect()} />
  )
}

export default LogIn;
