import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { TailSpin } from 'react-loading-icons'
import { Box, Button, Checkbox, FormControl, FormHelperText, FormLabel, Input, Grid, GridItem, Text, StackDivider, Stack, VStack, Heading } from '@chakra-ui/react'
import AddressForm from '../../components/addressform/AddressForm';
import { PaymentElement, CardElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getTotalPrice } from '../../utils/cart/cartSlice';
import { createPaymentIntent, getSecret, getStatus } from '../../utils/stripe/stripeSlice';
import StripeCheckout from '../../components/stripeCheckout/StripeCheckout';

const Checkout = () => {
  const { field, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const dispatch = useDispatch();
  let status = useSelector(getStatus);
  const totalPrice = useSelector(getTotalPrice);
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  const secret = useSelector(getSecret);
  const options = {
    clientSecret: secret,
  };

  useEffect(() => {
    dispatch(createPaymentIntent(totalPrice));
  }, []);

  const onSubmit = async () => {
    
  }

  const renderProduct = () => {
    switch (secret){ 
      case null:
        return <Box>Error: Checkout does not exist.</Box>;
      case false:
        return <Box>Error generating checkout.</Box>;
      default:
        return (
          <Elements stripe={stripePromise} options={options}>
          <Grid  
            templateColumns='repeat(5, 1fr)'>
            <GridItem colSpan={3}>
              <Heading>Checkout page</Heading>
              <form onSubmit={handleSubmit(onSubmit)}></form>
              <Stack divider={<StackDivider />} spacing={4} align='stretch'>
                <Heading size="md">Address</Heading>
                <Box>
                  <Text>Ship to:</Text>
                  <AddressForm />
                  <Checkbox>Update address</Checkbox>
    
                  <Text>Bill to:</Text>
                  <AddressForm />
                  <Checkbox>Billing is the same as shipping</Checkbox>
                </Box>
    
                <Heading size="md">Payment</Heading>
                <Box>
                </Box>
    
                <Heading size="md">Total</Heading>
                <Box>
                  <Text>Order Summary:</Text>
                  <Text>Shipping:</Text>
                  <Text>Sales Tax:</Text>
                  <Button>Place Order</Button>
                </Box>
              </Stack>
            </GridItem>
    
            <GridItem colSpan={2}>
              <VStack>
                <Text>Order Summary:</Text>
                <Text>Shipping:</Text>
                <Text>Sales Tax:</Text>
              </VStack>
              <StripeCheckout />
            </GridItem>
          </Grid>
          </Elements>
        );
    }
  }
  if (status === 'pending') 
    return <TailSpin stroke="#3B0839"/>;
  else return (
    renderProduct()
  )
}

export default Checkout;
