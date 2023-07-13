import { Container, Box, Text, Stack, InputGroup, Input, InputLeftElement, Icon, FormLabel, Link, Button, Divider, FormControl, Heading } from '@chakra-ui/react';
import { HStack, VStack, Flex, Spacer, Grid, StackDivider} from '@chakra-ui/react';
import { FaRegEnvelope, FaLock, FaRegUser } from "react-icons/fa";

const AccountOld = () => {
  return (
    <>
      <Grid gridTemplateColumns={'1fr 7fr 1fr'} py={1} gap={4}>
        <Flex align="flex-end">
          <Link to='/checkout'>
            <Button colorScheme='mainPurple' justify="flex-start">Checkout</Button>
          </Link>
        </Flex>
        <Stack divider={<StackDivider />}>
          <HStack align="end">
            <Heading size='lg'>Shopping Cart</Heading>
            <Spacer />
            <Box fontWeight="600" fontSize="18px">Price</Box>
          </HStack>
          <VStack divider={<StackDivider />}>{}</VStack>
          <HStack fontSize="18px" py={2}>
            <Spacer />
            <Text>Subtotal :</Text>
            <Text fontWeight="600">${}</Text>
          </HStack>
        </Stack>
        <Box></Box>
      </Grid>

      <Container maxW="container.sm">
        <Heading marginBottom="1.5rem">Edit profile</Heading>
        <form>
          <Box bg="secondary.card" rounded="lg" p={5}>
            <Stack spacing={4} marginBottom="1rem">
              <FormControl>
                <FormLabel htmlFor="name">Your name</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<Icon as={FaRegUser} color="secondary.inputHelper" />} />
                  <Input focusBorderColor="main.500" type="text" name="name" id="name" placeholder="John Doe" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<Icon as={FaRegEnvelope} color="secondary.inputHelper" />} />
                  <Input focusBorderColor="main.500" type="email" name="email" id="email" placeholder="name@example.com" />
                </InputGroup>
              </FormControl>
            </Stack>
          </Box>

          <Stack spacing={0} marginTop="2rem" marginBottom="1rem">
            <Heading as="h4" size="md">
              Security settings
            </Heading>
            <Text color="gray.500" fontSize="md">
              Update your password
            </Text>
          </Stack>

          <Box bg="secondary.card" rounded="lg" p={5}>
            <Stack spacing={4} marginBottom="1rem">
              <FormControl>
                <Stack justifyContent="space-between" isInline>
                  <FormLabel htmlFor="old_password">
                    Current password
                  </FormLabel>
                </Stack>
                <InputGroup>
                  <InputLeftElement
                    children={
                      <Icon as={FaLock} color="secondary.inputHelper" />
                    }
                  />
                  <Input focusBorderColor="main.500" name="old_password" id="old_password" type="password" placeholder="Enter your current password" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <Stack justifyContent="space-between" isInline>
                  <FormLabel htmlFor="new_password">New password</FormLabel>
                </Stack>
                <InputGroup>
                  <InputLeftElement
                    children={
                      <Icon as={FaLock} color="secondary.inputHelper" />
                    }
                  />
                  <Input focusBorderColor="main.500" name="new_password" id="new_password" type="password" placeholder="Enter your new password" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <Stack justifyContent="space-between" isInline>
                  <FormLabel htmlFor="new_password2">
                    Confirm new password
                  </FormLabel>
                </Stack>
                <InputGroup>
                  <InputLeftElement
                    children={
                      <Icon as={FaLock} color="secondary.inputHelper" />
                    }
                  />
                  <Input focusBorderColor="main.500" name="new_password2" id="new_password2" type="password" placeholder="Confirm your new password" />
                </InputGroup>
              </FormControl>
            </Stack>
          </Box>

          <Stack direction={["column", "row"]} spacing="1rem" justify="end" marginTop="2rem">
            <Button colorScheme="main" variant="outline">
              Cancel
            </Button>
            <Button type="submit" colorScheme="main">
              Update settings
            </Button>
          </Stack>
        </form>

        <Divider marginTop="2rem" marginBottom="2rem" orientation="horizontal" />
        <Box bg="secondary.card" rounded="lg" p={5} marginBottom="2rem">
          <Stack spacing={0} marginBottom="1rem">
            <Heading as="h4" size="md">
              Danger zone
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Delete your account and data
            </Text>
          </Stack>
          <Stack spacing={4} marginBottom="1rem">
            <Button colorScheme="red" variant="outline">
              Delete your account
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export default AccountOld;
