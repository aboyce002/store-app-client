import { useEffect } from 'react';
import { Link as ReactLink, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { TailSpin } from 'react-loading-icons'
import { Box, Link, Text, } from '@chakra-ui/react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import { getCart, getTotalPrice } from '../../utils/cart/cartSlice';
import { createPaymentIntent, getSecret, getStatus } from '../../utils/stripe/stripeSlice';
import RenderFromData from '../../components/renderfromdata/RenderFromData';
import PaypalMerchant from '../../components/checkoutoptions/paypalMerchant/PaypalMerchant';
import StripeMerchant from '../../components/checkoutoptions/stripeMerchant/StripeMerchant';

const Pay = () => {
  const { field, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  let status = useSelector(getStatus);
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);
  const getPaymentMethod = () => { return searchParams.get('method'); }
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  const secret = useSelector(getSecret);
  const options = {
    clientSecret: secret,
  }

  useEffect(() => {
    dispatch(createPaymentIntent(totalPrice));
  }, []);

  const stripePayment = () => {
    return (
      <Elements stripe={stripePromise} options={options}>
        <StripeMerchant />
      </Elements>
    )
  }

  const paypalPayment = () => {
    return <PaypalMerchant />
  }

  if (getPaymentMethod === 'stripe')
    return stripePayment();
  else if (getPaymentMethod === 'paypal')
    return paypalPayment();
  else
    return (
      <Text>No payment method selected; <Link as={ReactLink} to='/search'>add something to it!</Link></Text>
    )
}

export default Pay;
