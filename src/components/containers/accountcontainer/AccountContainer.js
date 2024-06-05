import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Container, Grid, Text } from '@chakra-ui/react';
import AccountSidebar from "../../account/AccountSidebar";
import RenderFromData from '../../renderfromdata/RenderFromData';
import { getUser } from '../../../utils/user/userSlice';

const AccountContainer = () => {
  const user = useSelector(getUser);

  const renderAccountComponent = () => {
    return (
      <Grid gridTemplateColumns={'1fr 4fr'} py={1} >
        <AccountSidebar />
        <Container maxW="container.sm">
          <Outlet />
        </Container>
      </Grid>
    )
  }

  return (
    <RenderFromData
      data={user}
      ifNull={<Text>Please log in to view account data.</Text>}
      ifFalse={<Text>Please log in to view account data.</Text>}
      ifEmpty={<Text>Please log in to view account data.</Text>}
      ifExists={renderAccountComponent()} />
  );
}

export default AccountContainer;
