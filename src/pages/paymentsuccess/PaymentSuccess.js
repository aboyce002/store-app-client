import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '@chakra-ui/react'
import { useStripe } from "@stripe/react-stripe-js";
import { getSecret } from '../../utils/stripe/stripeSlice';
import { removeAll } from '../../utils/cart/cartSlice';

const PaymentSuccess = ({ socket }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const stripe = useStripe();
  const secret = useSelector(getSecret);

  const createOrder = () => {
    
  }

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));

    if (stripe && secret) {
      const getStripeStatus = async () => await stripe.retrievePaymentIntent(secret).then(({ paymentIntent }) => {
        console.log("paymentintent status: ", paymentIntent.status);
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            console.log("payment success");
            removeAll();
            break;
          /* case "processing":
             setMessage("Your payment is processing.");
             break;
           case "requires_payment_method":
             setMessage("Your payment was not successful, please try again.");
             break;*/
          default:
            break;
        }
      });
      getStripeStatus();
    }

  }, [socket, messages, stripe, secret]);

  // TODO: implement post-payment email
  return (
    <Text>{message || "Payment succeeded! An email with transaction details has been sent to you."}</Text>
  )
}

export default PaymentSuccess;
