import { Outlet } from 'react-router-dom';
import { Container, Grid } from '@chakra-ui/react';
import AccountSidebar from "../../account/AccountSidebar";

const AccountContainer = () => {
  return (
    <Grid gridTemplateColumns={'1fr 4fr'} py={1} >
      <AccountSidebar />
      <Container maxW="container.sm">
        <Outlet/>
      </Container>
    </Grid>
  );
}

export default AccountContainer;
