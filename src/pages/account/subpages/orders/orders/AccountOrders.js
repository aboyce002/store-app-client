import { Link as ReactLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TailSpin } from 'react-loading-icons'
import { Box, Link, Heading, Text, Table, Thead, Tr, Th, Td, TableContainer, TableCaption, Tbody, } from '@chakra-ui/react';
import { getUser } from '../../../../../utils/user/userSlice';
import { fetchOrdersForUser, getOrders, getStatus } from '../../../../../utils/order/orderSlice';
import RenderFromData from '../../../../../components/renderfromdata/RenderFromData';

const AccountOrders = () => {
  const dispatch = useDispatch();
  const orderList = useSelector(getOrders);
  let status = useSelector(getStatus);
  const user = useSelector(getUser);

  useEffect(() => {
    console.log("user: ", user);
    if (user) dispatch(fetchOrdersForUser(user.id));
  }, [user, dispatch]);

  const renderOrders = () => {
    return orderList.map((order, index) => (
      <Tr key={order.id}>
        <Td>{order.id}</Td>
        <Td>{order.date_created}</Td>
        <Td isNumeric>{order.total}</Td>
        <Td>
          <Link as={ReactLink} to={order.id.toString()} variant="text-link-blue">
            View Details
          </Link>
        </Td>
      </Tr>
    ));
  }

  const renderOrderPage = () => {
    return (
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
              {renderOrders()}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    )
  }

  if (status === 'pending')
    return <TailSpin stroke="#3B0839" />;
  else
    return (
      <RenderFromData
        data={orderList}
        ifNull={<Text>Error retrieving orders; please try again later.</Text>}
        ifFalse={<Text>Error retrieving orders; please try again later.</Text>}
        ifEmpty={<Text>No orders found.</Text>}
        ifExists={renderOrderPage()} />
    )
}

export default AccountOrders;
