import { Box, Flex, HStack, VStack, Spacer, Image } from '@chakra-ui/react';

const Homepage = () => {
  return (
    <Flex>
      <VStack>
        <Box style={{ textAlign: 'center' }}>
          <Image src={require('../../assets/images/unicorns.jpg')}></Image>
        </Box>
        <Box bg="#7B287D">
          <h1>
            New Plushies
          </h1>
        </Box>
      </VStack>
    </Flex>
  )
}

export default Homepage;
