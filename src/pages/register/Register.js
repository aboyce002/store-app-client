import { useCallback, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as ReactLink, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Stack, Button, FormControl, FormErrorMessage, FormLabel, Input, Link, Text, UnorderedList,
  Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, ListItem, InputRightElement, InputGroup
} from '@chakra-ui/react';
import ReCAPTCHA from "react-google-recaptcha"
import { clearError, getError, getStatus, getUser, registerUser } from '../../utils/user/userSlice';
import RenderFromData from '../../components/renderfromdata/RenderFromData';
import LoginContainer from '../../components/containers/logincontainer/LoginContainer';
import ShowPasswordToggleButton from "../../components/buttons/showpasswordtogglebutton/ShowPasswordToggle";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const error = useSelector(getError);
  const status = useSelector(getStatus);
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm();
  const captchaRef = useRef(null)
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    dispatch(registerUser({ email: data.email, password: data.password }));
  }

  const handleRedirect = useCallback(async () => {
    if (status === 'fulfilled')
      navigate('/register/success');
  }, [status, navigate])

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);

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
      <Navigate replace to='/' />,
      <p>You are already logged in. Redirecting...</p>
    );
  }

  // Email verification. Eventually.
  // Limit fields to 254 characters so the db doesn't explode
  // 72 for passwords
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
                {...register("email", { required: true, maxLength: 254 })} />
              <FormErrorMessage>
                {errors.password && errors.password.type === "required" && (
                  <span role="alert">Email field cannot be blank.</span>
                )}
                {errors.password && errors.password.type === "maxLength" && (
                  <span role="alert">Email is too long.</span>
                )}
              </FormErrorMessage>
            </FormControl>
            <Popover
              returnFocusOnClose={false}
              placement='right-start'
              closeOnBlur={true}
              trigger="hover"
            >
              <PopoverTrigger>
                <FormControl id="password" name="password" isInvalid={errors.password}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      aria-invalid={errors.name ? "true" : "false"}
                      {...register("password", { required: true, minLength: 8, maxLength: 72, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/ })}
                    />
                    <InputRightElement width='3.5rem'>
                      <ShowPasswordToggleButton show={showPassword} setShow={setShowPassword} />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.type === "required" && (
                      <span role="alert">You must enter a password.</span>
                    )}
                    {errors.password && errors.password.type === "maxLength" && (
                      <span role="alert">Max length exceeded.</span>
                    )}
                    {errors.password && errors.password.type === "minLength" && (
                      <span role="alert">Minimum length not met.</span>
                    )}
                    {errors.password && errors.password.type === "pattern" && (
                      <span role="alert">Password requirements not met.</span>
                    )}
                  </FormErrorMessage>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent display='flex' align='left'>
                <PopoverHeader fontWeight='semibold'>Choosing a Password</PopoverHeader>
                <PopoverArrow />
                <PopoverBody>
                  <Text>Password must contain at least:</Text>
                </PopoverBody>
                <PopoverFooter>
                  <UnorderedList ml={10}>
                    <ListItem>8 characters</ListItem>
                    <ListItem>Uppercase and lowercase</ListItem>
                    <ListItem>One number</ListItem>
                    <ListItem>One special character</ListItem>
                  </UnorderedList>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
            <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} ref={captchaRef} />
            {getErrorText()}
            <Button fontSize="xl" type="submit" isLoading={isSubmitting}>Register</Button>
            <Text>Already have an account? <Link as={ReactLink} to='/login' variant="text-link-blue">Log in here</Link></Text>
          </Stack>
        </form>
      </Stack >
    );
  }

  return (
    <LoginContainer>
      <RenderFromData
        data={user}
        ifFalse={renderContent()}
        ifExists={redirect()} />
    </LoginContainer>
  );
}

export default Register;
