import { Box, Heading, Table, Thead, Tr, Th, Td, TableContainer, TableCaption, Tbody } from '@chakra-ui/react';

const AccountOrderDetails = () => {
  return (
    <>
      <Box py={5}>
        <Heading marginBottom="1rem">Orders</Heading>
        <Heading as="h4" size="md">
          Order history
        </Heading>
        <TableContainer>
          <Table variant='striped' colorScheme='mainBlue'>
            <TableCaption>Please contact us if you do not see your order listed</TableCaption>
            <Thead>
              <Tr>
                <Th>ORDER #</Th>
                <Th>DATE</Th>
                <Th isNumeric>TOTAL</Th>
                <Th>SHIP TO</Th>
                <Th>ORDER DETAILS</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default AccountOrderDetails;
