import { Outlet } from 'react-router-dom';
import { Container, Flex, Center } from '@chakra-ui/react';

const PageContainer = () => {
  return (
    <Flex className='flexContainer' flex="1 0 auto" textAlign="center">
      <Container className="main" bg='white' color="#505050" py={4} px={[2, 6, 10]} minW={{ base: 'calc(100vw)', md: 'calc(85vw)' }} boxShadow='md'>
        <Center w="100%">
          <Outlet />
        </Center>
      </Container>
    </Flex>
  )
}

export default PageContainer;