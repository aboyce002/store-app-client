import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Home_Page from './Home_Page';
const Footer = () => <h2>Footer</h2>
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

class App extends Component {
  componentDidMount() {
     this.props.fetchUser();
  }

  render (){
    return (
      <div className="App container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact={true} path="/" component={Home_Page} />
            <Route exact={true} path="/surveys" component={Dashboard} />
            <Route exact={true} path="/surveys/new" component={SurveyNew} />
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default connect(null, actions) (App);
