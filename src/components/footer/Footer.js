import { Box, HStack, VStack, StackDivider, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box align="center" p={2} bgColor="#3B0839" textStyle="footer">
      <VStack spacing={-5}>
        <Text>@Kass Crafts, 2023. All rights reserved.</Text>
        <Text>All images are for show only and belong to their respective owners.</Text>
        <Text>Website is a demo and does not represent the final product.</Text>
        <HStack divider={<StackDivider />}>
          <Text>Terms of Service </Text>
          <Text>Privacy Policy</Text>
          <Text>About Us</Text>
          <Text>Contact Us</Text>
        </HStack>
      </VStack>
    </Box>
  )
}

export default Footer;
