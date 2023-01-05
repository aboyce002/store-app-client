import { Box, Flex, HStack, Stack, VStack, Spacer, StackDivider, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
  <Box as="footer" alignItems='center' role="contentinfo" w="100%" p={2} color="white" bgColor="#7E1F69">      
    <VStack spacing={0}>
      <Box className="left">
        <Text fontSize="12px">@Aaaaaaaaaaaa, 2021. All rights reserved.</Text>
      </Box>

      <HStack>
        <Box className="right">
          <Text fontSize="12px">Terms of Service </Text>
        </Box>
        <Box className="right">
          <Text fontSize="12px">| Privacy Policy</Text>
        </Box>
        <Box className="right">
          <Text fontSize="12px">| About Us</Text>
        </Box>
        <Box className="right">
          <Text fontSize="12px">| Contact us</Text>
        </Box>
      </HStack>
    </VStack>
  </Box>
  )
}

export default Footer;
