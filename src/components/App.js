import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../utils/user/userSlice';
import Account from '../pages/account/Account';
import Checkout from '../pages/checkout/Checkout';
import Footer from './footer/Footer';
import Header from './header/Header';
import Homepage from '../pages/homepage/Homepage';
import LogIn from '../pages/login/LogIn';
import Product from '../pages/product/Product';
import Search from '../pages/search/Search';
import SignUp from '../pages/signup/SignUp';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(fetchUser());
  });

  return (
    <div className="App container">
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="/account" element={<Account />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/product" element={<Product />} />
            <Route path="/search" element={<Search />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App
