import { Link as ReactLink } from 'react-router-dom';
import { Link, Text } from '@chakra-ui/react'

const RegisterSuccess = () => {
  return (
    <Text>Registration success! You may now <Link as={ReactLink} to='/login' variant="text-link-blue">log in.</Link></Text>
  )
}

export default RegisterSuccess;
