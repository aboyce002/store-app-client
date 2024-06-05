import { Link as ReactLink } from 'react-router-dom';
import { HStack, VStack, Text, Box, Link, SimpleGrid } from '@chakra-ui/react'

const Footer = () => {
  return (
    <SimpleGrid columns={3} bgColor="#3B0839" textStyle="footer" w="full" py={3} px={5}>
      <VStack fontSize="11" align="start" spacing={0}>
        <Text>Website is a demo and does not represent the final product.</Text>
        <Text >All images are for show only and belong to their respective owners.</Text>
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
      <VStack fontSize="11" align="end" spacing={0}>
        <Text>Code: <Link as={ReactLink} to='https://github.com/aboyce002/store-app-client'>Frontend</Link></Text>
        <Link as={ReactLink} to='https://github.com/aboyce002/store-app-server'>Backend</Link>
      </VStack>
      <Box />
    </SimpleGrid>
  )
}

export default Footer;
