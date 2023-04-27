import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Flex } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { fetchUser } from '../utils/user/userSlice';
import Account from '../pages/account/Account';
import Cart from '../pages/cart/Cart';
import Checkout from '../pages/checkout/Checkout';
import Footer from './footer/Footer';
import Header from './header/Header';
import Main from './main/Main';
import NotFound from '../pages/notfound/NotFound';
import Homepage from '../pages/homepage/Homepage';
import LogIn from '../pages/login/LogIn';
import Register from '../pages/register/Register';
import Product from '../pages/product/Product';
import Search from '../pages/search/Search';
import SignUp from '../pages/signup/SignUp';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(fetchUser());
  }, []);

  return (
    <Flex className="app" direction="column" minH="100vh" textStyle="baseStyle" bg="#F0EDED">
      <BrowserRouter>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="/account" element={<Account />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/product" element={<Product />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Search />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Main>
        <Footer />
      </BrowserRouter>
    </Flex>
  );
}

export default App;
