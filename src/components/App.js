import React, { Component } from 'react';
import { axios } from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../utils/actions';

import Account from '../pages/account/Account';
import Checkout from '../pages/checkout/Checkout';
import Footer from './footer/Footer';
import Header from './header/Header';
import Homepage from '../pages/homepage/Homepage';
import LogIn from '../pages/login/LogIn';
import Search from '../pages/search/Search';
import SignUp from '../pages/signup/SignUp';
const Dashboard = () => <h2>Dashboard</h2>

class App extends Component {
  componentDidMount() {
     this.props.fetchUser();
  }

  render (){
    return (
      <div className="App container">
        <BrowserRouter>
          <>
            <Header />
            <Route exact path="/" component={Homepage} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/login" component={LogIn} />
            <Route path="/search" component={Search} />
            <Route exact path="/sign-up" component={SignUp} />
            <Footer />
          </>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
