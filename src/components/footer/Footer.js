import { Box, HStack, Stack, VStack, Spacer, StackDivider } from '@chakra-ui/react'

const Footer = () => {
  return (
  <Box as="footer" role="contentinfo" w="100%" p={2} color="white" bgGradient="linear(to-l, #410F9E,#0F979C)">      
    <VStack spacing={0}>
      <Box className="left">
        <p>@Aaaaaaaaaaaa, 2021. All rights reserved.</p>
      </Box>

      <HStack>
        <Box className="right">
          <p>Terms of Service </p>
        </Box>
        <Box className="right">
          <p>| Privacy Policy</p>
        </Box>
        <Box className="right">
          <p>| About Us</p>
        </Box>
        <Box className="right">
          <p>| Contact us</p>
        </Box>
      </HStack>
    </VStack>
  </Box>
  )
}

export default Footer;
