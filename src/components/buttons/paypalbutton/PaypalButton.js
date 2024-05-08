import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaypalLoading from './PaypalLoading';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { createOrder, onApprove } from "../../../utils/paypal/paypalSlice";
import { getCart } from '../../../utils/cart/cartSlice';

const PaypalButton = () => {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const navigate = useNavigate();

  return (
    <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
      <PaypalLoading />
      <PayPalButtons
        fundingSource='paypal'
        style={{
          layout: 'vertical',
          shape: 'rect',
          zIndex: 0
        }}
        createOrder={(data, actions) => dispatch(createOrder({ cart, data, actions }))
          .unwrap()
          .then((orderID) => {
            return orderID;
          })
          .catch((error) => {
            return console.error(error.message);
          })
        }
        onApprove={(data, actions) => { console.log("order approved"); dispatch(onApprove({ data, actions, navigate })) }}
      />
    </PayPalScriptProvider>
  );
}

export default PaypalButton;
