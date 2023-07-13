import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Stack, Button, FormControl, FormLabel, Input, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import ReCAPTCHA from "react-google-recaptcha"
import { getUser, registerUser } from '../../utils/user/userSlice';
import RenderFromData from '../../components/renderfromdata/RenderFromData';

const Register = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const { field, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [email, setEmailValue] = useState(null);
  const [password, setPasswordValue] = useState(null);
  const captchaRef = useRef(null)

  const onSubmit = async () => {
    dispatch(registerUser(email, password));
  }

  const redirect = () => {
    return (
      <Navigate replace to='/' />,
      <p>You are already logged in. Redirecting...</p>
    );
  }

  const renderContent = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5} fontSize="15px" color="black" bg="white">
          <FormControl id="email">
            <FormLabel>Email Address</FormLabel>
            <Input type="email" onChange={(event) => setEmailValue(event.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" onChange={(event) => setPasswordValue(event.target.value)} />
          </FormControl>
          <UnorderedList>
            <Text>Password must contain at least:</Text>
            <Text>8 characters.</Text>
            <Text>One lowercase and one uppercase character.</Text>
            <Text>One number</Text>
            <Text>One special character (such as @!#$%^*)</Text>
          </UnorderedList>
          <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} ref={captchaRef} />
          <Button fontSize="xl" isLoading={isSubmitting} onClick={onSubmit}>Register</Button>
        </Stack>
      </form>
    );
  }

  return (
    <RenderFromData
      data={user}
      ifFalse={renderContent()}
      ifExists={redirect()} />
  )
}

export default Register;
