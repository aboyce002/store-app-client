import { loadStripe } from '@stripe/stripe-js';
import { connect } from 'react-redux';
import * as actions from "../utils old/actions";

let stripePromise;

const getStripe = () => {
  if (!stripePromise)
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

  return stripePromise;
}

const PayStripe = () => {
  return ( 
    /*<StripeCheckout
      name="plushie"
      description="$15 for plushie"
      amount={this.props.amount}
      token = {token => this.props.handleToken(token, this.props.amount)}
      stripeKey = {process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
    >*/
      <button className="btn">
        Add plushie
      </button>
  );
}

export default connect(null, actions)(PayStripe);
