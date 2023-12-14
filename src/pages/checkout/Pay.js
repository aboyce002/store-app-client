import { useEffect } from 'react';
import { Link as ReactLink, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { TailSpin } from 'react-loading-icons'
import { Box, Link, Text, } from '@chakra-ui/react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import { getCart } from '../../utils/cart/cartSlice';
import { createPaymentIntent, getSecret, getStatus } from '../../utils/stripe/stripeSlice';
import RenderFromData from '../../components/renderfromdata/RenderFromData';
import PaypalMerchant from '../../components/checkoutoptions/paypalMerchant/PaypalMerchant';
import StripeMerchant from '../../components/checkoutoptions/stripeMerchant/StripeMerchant';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Pay = () => {
  const { field, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const status = useSelector(getStatus);
  const cart = useSelector(getCart);
  const getPaymentMethod = () => { return searchParams.get('method'); }
  const secret = useSelector(getSecret);
  const options = {
    clientSecret: secret,
  }

  useEffect(() => {
    dispatch(createPaymentIntent(cart));
  }, []);

  const stripePayment = () => {
    return (
      <Elements key={secret} stripe={stripePromise} options={options}>
        <StripeMerchant />
      </Elements>
    )
  }

  const paypalPayment = () => {
    return <PaypalMerchant />
  }

  const renderPaymentMethod = () => {
    if (getPaymentMethod === 'stripe')
      return stripePayment();
    else if (getPaymentMethod === 'paypal')
      return paypalPayment();
    else
      return (
        <Text>No payment method selected; <Link as={ReactLink} to='/search'>add something to it!</Link></Text>
      )
  }

  if (!cart || cart.length === 0)
    return <Text>There's nothing in your cart; <Link as={ReactLink} to='/search'>add something to it!</Link></Text>
  else if (status === 'pending')
    return <TailSpin stroke="#3B0839" />;
  else
    return (
      <RenderFromData
        data={cart}
        ifNull={<Text>Error retrieving checkout data.</Text>}
        ifFalse={<Text>Error generating checkout.</Text>}
        ifEmpty={<Text>You don't have a cart to checkout; <Link as={ReactLink} to='/search'>add something to it!</Link></Text>}
        ifExists={renderPaymentMethod()} />
    )
}

export default Pay;
