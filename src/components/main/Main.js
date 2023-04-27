import { Container, Flex, Center } from '@chakra-ui/react';

const Main = (props) => {
  return (
    <Container className='flexContainer' flex="1 0 auto" textAlign="center" centerContent>
      <Flex className="main" bg='white' color="#505050" py={4} px={10} minW='calc(85vw)' boxShadow='md'>
        <Center w="100%">
          {props.children}
        </Center>
      </Flex>
    </Container>
  )
}

export default Main;
