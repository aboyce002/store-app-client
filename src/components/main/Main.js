import { Container, Flex, Center } from '@chakra-ui/react'

const Main = (props) => {
  return (
    <Container className='flexContainer' flex="1 0 auto" p={5} textAlign="center" centerContent>
      <Flex className="main" bg='#E8EBEE' color="#505050" py={4} px={10} minWidth='calc(60vw)'>
        <Center w="100%">
          {props.children}
        </Center>
      </Flex>
    </Container>
  )
}

export default Main;
