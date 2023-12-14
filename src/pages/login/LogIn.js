import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink, Navigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { Stack, Box, Center, Text, Flex, Link, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { getUser, loginUser } from '../../utils/user/userSlice';
import RenderFromData from '../../components/renderfromdata/RenderFromData';
import LoginContainer from '../../components/containers/logincontainer/LoginContainer';

const LogIn = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const { field, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [email, setEmailValue] = useState(null);
  const [password, setPasswordValue] = useState(null);

  const onSubmit = async () => {
    dispatch(loginUser({email, password}));
  }

  const redirect = () => {
    return (
      <Navigate replace to='/' />,
      <Text>You are already logged in. Redirecting...</Text>
    );
  }

  const renderContent = () => {
    return (
      <Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5} fontSize="15px" color="black" bg="white">
            <FormControl id="username" isInvalid={errors.name}>
              <FormLabel>Email</FormLabel>
              <Input type="text" onChange={(event) => setEmailValue(event.target.value)}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={(event) => setPasswordValue(event.target.value)}/>
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
        <Text>Don't have an account? <Link as={ReactLink} to='/register'>Register here</Link></Text>
      </Stack>
    );
  }

  return (
    <LoginContainer>
      <RenderFromData
        data={user}
        ifFalse={renderContent()}
        ifExists={redirect()} />
    </LoginContainer>
  )
}

export default LogIn;
