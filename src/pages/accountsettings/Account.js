import { Outlet } from 'react-router-dom';
import { Container, Grid } from '@chakra-ui/react';
import AccountSidebar from "./components/AccountSidebar";

const Account = () => {
  return (
    <Grid gridTemplateColumns={'1fr 4fr'} py={1} >
      <AccountSidebar />
      <Container maxW="container.sm">
        <Outlet/>
      </Container>
    </Grid>
  );
}

export default Account;
