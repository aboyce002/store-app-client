import { useEffect, useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { TailSpin } from 'react-loading-icons'
import { Box, Button, Checkbox, Divider, Heading, Grid, GridItem, Link, Stack, Text, Spacer, VStack, StackDivider } from '@chakra-ui/react'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/react'
import PaypalMerchant from '../../components/checkoutoptions/paypalMerchant/PaypalMerchant';
import StripeMerchant from '../../components/checkoutoptions/stripeMerchant/StripeMerchant';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import { createPaymentIntent, getSecret, getStatus } from '../../utils/stripe/stripeSlice';
import { getCart, getTotalPrice, getTotalQuantity } from '../../utils/cart/cartSlice';
import { setCurrentAddress } from '../../utils/useraddress/userAddressSlice';
import AddressForm from '../../components/forms/addressform/AddressForm';
import OrderSummary from './components/OrderSummary';
import RenderFromData from '../../components/renderfromdata/RenderFromData';
import useDesktopSize from '../../hooks/useDesktopSize';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { field, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const cart = useSelector(getCart);
  const isDesktopSize = useDesktopSize();
  const secret = useSelector(getSecret);
  const totalPrice = useSelector(getTotalPrice);
  const totalQuantity = useSelector(getTotalQuantity);
  const options = {
    clientSecret: secret,
  };
  const [paymentMethod, setPaymentMethod] = useState('1')

  useEffect(() => {
    dispatch(createPaymentIntent(cart));
  }, [cart]);

  const onSubmit = async (address) => {
    dispatch(setCurrentAddress(address));
  }

  const renderCheckout = () => {
    if (!secret)
      return <TailSpin stroke="#3B0839" />;
    else return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          templateAreas={isDesktopSize ?
            `"header header" 
          "main summary"`
            :
            `"header" 
          "main" 
          "summary"`}
          gridTemplateColumns={isDesktopSize ? '1.5fr 1fr' : '1fr'}
          gridTemplateRows={isDesktopSize ? '50px 1fr' : '1fr'}
          py={1} gap={4} columnGap={12}>
          <GridItem area={'header'}>
            <Heading size='lg'>Checkout</Heading>
            <Divider />
          </GridItem>

          <GridItem area={'main'}>
            <VStack align="start" divider={<StackDivider />}>
              <Stack align="start">
                <Heading size="md">Ship To</Heading>
                <AddressForm />
                <Stack align="end">
                  <Checkbox >Update address</Checkbox>
                </Stack>
              </Stack>
              <Stack>
                <Heading size="md">Payment Method</Heading>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                          PayPal
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      On order placement, you will be redirected to PayPal to finish your transaction.
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                          Card
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Elements key={secret} stripe={stripePromise} options={options}>
                        <StripeMerchant />
                      </Elements>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Stack>
              <Stack>
                <OrderSummary />
              </Stack>
            </VStack>
          </GridItem>
          <GridItem area={'summary'}>
            <Stack align="end">
              <VStack fontSize="15px" spacing={1} py={2} align="end" justify="space-between">
                <Spacer />
                <Text>Subtotal ({Number(totalQuantity)} items): <u>${Number(totalPrice).toFixed(2)}</u></Text>
                <Text>Shipping & Handling: <u>$0</u></Text>
                <Text>Tax: <u>$0</u></Text>
                <Text fontWeight="600" fontSize="18px">Order Total: <u>${Number(totalPrice).toFixed(2)}</u></Text>
              </VStack>
              <Button colorScheme='mainPurple'>Place Order</Button>
            </Stack>
          </GridItem>
        </Grid>
      </form>
    );
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
        ifExists={renderCheckout()} />
    )
}

export default Checkout;
