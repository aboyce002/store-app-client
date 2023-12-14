import { Flex } from '@chakra-ui/react'

const AccountContainer = (props) => {
  return (
    <Flex bgColor="mainPurple.150" boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.15)" borderRadius="10px">
      {props.children}
    </Flex>
  )
}

export default AccountContainer;
