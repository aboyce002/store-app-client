import { useSelector, useDispatch } from 'react-redux';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { createOrder, onApprove } from "../../../utils/paypal/paypalSlice";
import { getCart } from '../../../utils/cart/cartSlice';

const PaypalMerchant = () => {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);

  return (
    <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
      <PayPalButtons
        fundingSource='paypal'
        style={{
          layout: 'vertical',
          shape: 'rect'
        }}
        createOrder={(data, actions) => dispatch(createOrder(cart, data, actions))
          .unwrap()
          .then((orderID) => {
            return orderID;
          })
          .catch((error) => {
            return console.error(error.message);
          })
        }
        onApprove={(data, actions) => dispatch(onApprove(data, actions))}
      />
    </PayPalScriptProvider>
  );
}

export default PaypalMerchant;
