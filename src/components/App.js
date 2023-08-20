import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Flex } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { fetchUser } from '../utils/user/userSlice';
import Account from '../pages/accountsettings/Account';
import Cart from '../pages/cart/Cart';
import Checkout from '../pages/checkout/Checkout';
import Footer from './footer/Footer';
import Header from './header/Header';
import PageContainer from './pagecontainer/PageContainer';
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
        <PageContainer>
          <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="/account" element={<Account />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/pay" element={<Pay />} />
            <Route path="/preorder" element={<Preorder />} />
            <Route path="/product" element={<Product />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageContainer>
        <Footer />
      </BrowserRouter>
    </Flex>
  );
}

export default App;
