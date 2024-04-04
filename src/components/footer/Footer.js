import { HStack, VStack, Text, Flex, Box, SimpleGrid } from '@chakra-ui/react'

const Footer = () => {
  return (
    <SimpleGrid columns={3} spacing={10} bgColor="#3B0839" textStyle="footer" w="full" py={2} px={5}>
        <VStack align="start" spacing={0}>
          <Text fontSize="11">Website is a demo and does not represent the final product.</Text>
          <Text fontSize="11">All images are for show only and belong to their respective owners.</Text>
        </VStack>
        <VStack align="center" spacing={0}>
          <Text>© 2024 Kass Crafts</Text>
          <HStack spacing={3}>
            <Text>Terms of Service </Text>
            <Text>Privacy Policy</Text>
            <Text>About Us</Text>
            <Text>Contact Us</Text>
          </HStack>
        </VStack>
        <Box />
    </SimpleGrid>
  )
}

export default Footer;
