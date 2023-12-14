import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Flex } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { fetchUser } from '../utils/user/userSlice';
import Account from '../pages/accountsettings/Account';
import AccountAddresses from '../pages/accountsettings/subpages/AccountAddresses';
import AccountOrderDetails from '../pages/accountsettings/subpages/AccountOrderDetails';
import AccountOrders from '../pages/accountsettings/subpages/AccountOrders';
import AccountPaymentMethods from '../pages/accountsettings/subpages/AccountPaymentMethods';
import AccountSettings from '../pages/accountsettings/subpages/AccountSettings';
import AddAddress from '../pages/accountsettings/subpages/AddAddress';
import Address from '../pages/accountsettings/subpages/Address';
import Cart from '../pages/cart/Cart';
import Checkout from '../pages/checkout/Checkout';
import Footer from './footer/Footer';
import Header from './header/Header';
import PageContainer from './containers/pagecontainer/PageContainer';
import PaymentFailure from '../pages/paymentfailure/PaymentFailure';
import PaymentSuccess from '../pages/paymentsuccess/PaymentSuccess';
import LoginContainer from './containers/logincontainer/LoginContainer';
import NotFound from '../pages/notfound/NotFound';
import Homepage from '../pages/homepage/Homepage';
import LogIn from '../pages/login/LogIn';
import Register from '../pages/register/Register';
import Pay from '../pages/checkout/Pay';
import Preorder from '../pages/preorder/Preorder';
import Product from '../pages/product/Product';
import Search from '../pages/search/Search';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <Flex className="app" direction="column" minH="100vh" textStyle="baseStyle" bg="#F0EDED">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<PageContainer />}>
            <Route index element={<Homepage />} />
            <Route path="account" element={<Account />}>
              <Route index element={<AccountSettings />} />
              <Route path="addresses" element={<AccountAddresses />} />
              <Route path="addresses/:addressId" element={<Address />} />
              <Route path="addresses/add" element={<AddAddress />} />
              <Route path="orders" element={<AccountOrders />} />
              <Route path="orders/:orderId" element={<AccountOrderDetails />} />
              <Route path="paymentmethods" element={<AccountPaymentMethods />} />
              <Route path="paymentsuccess" element={<PaymentSuccess />} />
              <Route path="paymentfailure" element={<PaymentFailure />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="login" element={<LogIn />} />
            <Route path="pay" element={<Pay />} />
            <Route path="preorder" element={<Preorder />} />
            <Route path="product" element={<Product />} />
            <Route path="register" element={<Register />} />
            <Route path="search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </Flex >
  );
}

export default App;
