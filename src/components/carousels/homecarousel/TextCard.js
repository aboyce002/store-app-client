import { Link as ReactLink } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { Box, Button, Card, CardHeader, CardBody, CardFooter, Flex, Heading, Text } from '@chakra-ui/react';

const TextCard = ({ text }) => {
  return (
    <Flex w="100%" h="100%" justify="right" align="center">
      <Card w="650px" h='200px' bgGradient="linear(to-r, transparent, mainPurple.150)" mr="4%">
        <CardHeader justify="left" align="start">
          <Heading size='lg'>Client Report</Heading>
        </CardHeader>

        <CardBody>
          <Box>
            <Text pt='2' fontSize='sm'>
              {text}
            </Text>
          </Box>
        </CardBody>

        <CardFooter justify="right">
          <Button variant='ghost' colorScheme='blue'>
            Go here
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  )
}

export default TextCard;
