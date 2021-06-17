import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Footer from './Footer';
import Header from './Header';
import Homepage from './Homepage';
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
          <>
            <Header />
            <Route exact={true} path="/" component={Homepage} />
            <Route exact={true} path="/surveys" component={Dashboard} />
            <Route exact={true} path="/surveys/new" component={SurveyNew} />
            <Footer />
          </>
        </BrowserRouter>
      </div>
    );
  }
};

export default connect(null, actions) (App);
