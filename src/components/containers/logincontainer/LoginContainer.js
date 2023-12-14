import { Outlet } from 'react-router-dom';
import { Flex, AbsoluteCenter } from '@chakra-ui/react'

const LoginContainer = (props) => {
  return (
    <AbsoluteCenter axis='both'>
      <Flex bgColor="mainPurple.150" boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.15)" borderRadius="10px" p='6'>
        {props.children}
      </Flex>
    </AbsoluteCenter>
  )
}

export default LoginContainer;
