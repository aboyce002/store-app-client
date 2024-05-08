import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Flex, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../utils/user/userSlice';
import socketIO from 'socket.io-client';
import AccountContainer from './containers/accountcontainer/AccountContainer';
import AccountAddresses from '../pages/account/subpages/addresses/addresses/AccountAddresses';
import AccountOrderDetails from '../pages/account/subpages/orders/orderdetails/AccountOrderDetails';
import AccountOrders from '../pages/account/subpages/orders/orders/AccountOrders';
import AccountPaymentMethods from '../pages/account/subpages/paymentmethods/AccountPaymentMethods';
import AccountSettings from '../pages/account/subpages/accountsettings/AccountSettings';
import AddressModalContainer from './containers/addressmodalcontainer/AddressModalContainer';
import AddAddress from '../pages/account/subpages/addresses/addaddress/AddAddress';
import AddAddressModal from './modals/checkoutaddressmodal/AddAddressModal';
import AddressListModal from './modals/checkoutaddressmodal/AddressListModal';
import Checkout from '../pages/checkout/Checkout';
import DeleteAddressConfirmationModal from './modals/deleteaddressconfirmationmodal/DeleteAddressConfirmationModal';
import EditAddress from '../pages/account/subpages/addresses/editaddress/EditAddress';
import EditAddressModal from './modals/checkoutaddressmodal/EditAddressModal';
import Cart from '../pages/cart/Cart';
import CheckoutContainer from './containers/checkoutcontainer/CheckoutContainer';
import Footer from './footer/Footer';
import Header from './header/Header';
import PageContainer from './containers/pagecontainer/PageContainer';
import PaymentSuccess from '../pages/paymentsuccess/PaymentSuccess';
import NotFound from '../pages/notfound/NotFound';
import Homepage from '../pages/homepage/Homepage';
import LogIn from '../pages/login/LogIn';
import Register from '../pages/register/Register';
import RegisterSuccess from '../pages/registersuccess/RegisterSuccess';
import Preorder from '../pages/preorder/Preorder';
import Product from '../pages/product/Product';
import Search from '../pages/search/Search';

const socket = socketIO.connect('http://localhost:3000');

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Flex className="app" direction="column" minH="100vh" textStyle="baseStyle" bg="#F0EDED">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<PageContainer />}>
            <Route index element={<Homepage />} />
            <Route path="account" element={<AccountContainer />}>
              <Route index element={<AccountSettings />} />
              <Route path="addresses" element={<AccountAddresses />} >
                <Route path="delete/:addressId" element={<DeleteAddressConfirmationModal />} />
              </Route>
              <Route path="addresses/add" element={<AddAddress />} />
              <Route path="addresses/edit/:addressId" element={<EditAddress />} />
              <Route path="addresses/edit/*" element={<Text>Address not found.</Text>} />
              <Route path="orders" element={<AccountOrders />} />
              <Route path="orders/:orderId" element={<AccountOrderDetails />} />
              <Route path="paymentmethods" element={<AccountPaymentMethods />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="cart" element={<Cart />} />
            <Route element={<CheckoutContainer />} >
              <Route index element={<Checkout />} />
              <Route path="checkout" element={<Checkout />}>
                <Route path="addresses" element={<AddressModalContainer />} >
                  <Route index element={<AddressListModal />} />
                  <Route path="add" element={<AddAddressModal />} />
                  <Route path="edit/:addressId" element={<EditAddressModal />} />
                  <Route path="edit/*" element={<Text>Address not found.</Text>} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Route>
              <Route path="checkout/paymentsuccess" element={<PaymentSuccess socket={socket} />} />
            </Route>
            <Route path="login" element={<LogIn />} />
            <Route path="preorder" element={<Preorder />} />
            <Route path="product" element={<Product />} />
            <Route path="register" element={<Register />} />
            <Route path="register/success" element={<RegisterSuccess />} />
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
