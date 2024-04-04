import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Stack, Box, Center, Text, Link, Button, FormControl, FormLabel, Input, useToast, InputRightElement, InputGroup, FormErrorMessage } from '@chakra-ui/react'
import { clearError, getUser, getError, loginUser } from '../../utils/user/userSlice';
import RenderFromData from '../../components/renderfromdata/RenderFromData';
import LoginContainer from '../../components/containers/logincontainer/LoginContainer';
import ShowPasswordToggleButton from "../../components/buttons/showpasswordtogglebutton/ShowPasswordToggle";

const LogIn = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector(getUser);
  const error = useSelector(getError);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    dispatch(loginUser({ email: data.email, password: data.password }));
  }

  const handleToast = useCallback(async () => {
    if (user)
      return (
        toast({
          title: 'Log in successful.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      );
  }, [user, toast])

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    handleToast();
  }, [handleToast]);

  const getErrorText = () => {
    if (error) {
      return (
        <Text color="#E53E3E" fontSize="14px">
          {error}
        </Text>
      )
    }
  }

  const redirect = () => {
    return (
      <Navigate to='/'>,
        <Text>You are logged in. Redirecting...</Text>
      </Navigate>
    );
  }

  const renderContent = () => {
    return (
      <Stack w="full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5}>
            <FormControl id="email" name="email" isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                autoComplete="email"
                {...register("email", { required: true })} />
              <FormErrorMessage>
                {errors.email && errors.email.type === "required" && (
                  <span role="alert">Email field cannot be blank.</span>
                )}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="password" name="password" isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  {...register("password", { required: true })} />
                <InputRightElement width='3.5rem'>
                  <ShowPasswordToggleButton show={showPassword} setShow={setShowPassword} />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.password && errors.password.type === "required" && (
                  <span role="alert">You must enter a password.</span>
                )}
              </FormErrorMessage>
            </FormControl>
            {getErrorText()}
            <Button fontSize="xl" type="submit" isLoading={isSubmitting}>Log In</Button>
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
        <Text>Don't have an account? <Link as={ReactLink} to='/register' variant="text-link-blue">Register here</Link></Text>
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
