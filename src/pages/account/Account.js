import { useSelector, useDispatch } from 'react-redux';
import { Box, Flex, HStack, Spacer, Heading, Divider, VStack } from '@chakra-ui/react'
import { getUser, getCredits } from '../../utils/user/userSlice';

const Account = () => {
  const credits = useSelector(getCredits);

  return (
    <VStack>
      <Heading>
        Account Info
      </Heading>
      <Heading>
        Edit Addresses
      </Heading>
      <Heading>
        Change Password
      </Heading>
      <Divider />
      <Heading>
        Orders
      </Heading>
    </VStack>
  )
}

export default Account;
