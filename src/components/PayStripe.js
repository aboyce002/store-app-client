import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from "../actions";

class payStripe extends Component {
  render() {
    return ( 
      <StripeCheckout
        name="plushie"
        description="$15 for plushie"
        amount={this.props.amount}
        token = {token => this.props.handleToken(token, this.props.amount)}
        stripeKey = {process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
      >
        <button className="btn">
          Add plushie
        </button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(payStripe);
