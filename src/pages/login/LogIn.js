import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { Stack, Spacer, Flex, Box, HStack, Button, Center, Text } from '@chakra-ui/react'
import { getUser, getCredits } from '../../utils/user/userSlice';

const LogIn = () => {
  const user = useSelector(getUser);

  const renderContent = () => {
    switch (user){ 
      case null:
        return <Box>Loading...</Box>;
      case false:
        return <Box>            
        <a href="/auth/google">
          <Button w={'full'} variant={'outline'} leftIcon={<FcGoogle />}>
            <Center>
              <Text>Sign in with Google</Text>
            </Center>
          </Button>
        </a>
      </Box>;
      default:
        return [
          <Navigate replace to='/'/>,
          <p>You are already logged in. Redirecting...</p>
        ];
    }
  }

  return (
    <HStack spacing="24px">
      <Link to={user ? '/' : '/login'} className="left logo">
        Log in page
      </Link>
      <Box className="right">
      {renderContent()}
      </Box>
    </HStack>
  )
}

export default LogIn;
