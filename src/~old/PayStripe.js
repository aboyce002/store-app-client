import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from '../pages/checkout/Checkout.js';

const PayStripe = () => {

  return ( 
    /*<StripeCheckout
      name="plushie"
      description="$15 for plushie"
      amount={this.props.amount}
      token = {token => this.props.handleToken(token, this.props.amount)}
      stripeKey = {process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
    >*/
  );
};

export default PayStripe;
