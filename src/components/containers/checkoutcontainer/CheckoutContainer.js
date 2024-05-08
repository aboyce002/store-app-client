import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink, Outlet } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import { Center, Link, Text } from '@chakra-ui/react';
import { TailSpin } from 'react-loading-icons'
import { createPaymentIntent, getSecret, getStatus } from '../../../utils/stripe/stripeSlice';
import { getCart } from '../../../utils/cart/cartSlice';
import { getUser } from '../../../utils/user/userSlice';
import { fetchUserAddress } from '../../../utils/useraddress/userAddressSlice';
import RenderFromData from '../../renderfromdata/RenderFromData';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutContainer = () => {
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const cart = useSelector(getCart);
  const secret = useSelector(getSecret);
  const user = useSelector(getUser);
  const options = {
    clientSecret: secret,
  };

  useEffect(() => {
    dispatch(createPaymentIntent(cart));
    if (user)
      if (user.main_address)
        dispatch(fetchUserAddress(user.main_address));
  }, [user, cart, dispatch]);

  if (status === 'pending')
    return <TailSpin stroke="#3B0839" />;
  return (
    <RenderFromData
      data={secret}
      ifNull={<TailSpin stroke="#3B0839" />}
      ifFalse={<TailSpin stroke="#3B0839" />}
      ifEmpty={<TailSpin stroke="#3B0839" />}
      ifExists={
        <Center w={["95%", "90%", "80%", "75%"]}>
          <Elements stripe={stripePromise} options={options}>
            <Outlet />
          </Elements>
        </Center>
      } />
  );
}

export default CheckoutContainer;
