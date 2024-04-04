import { useEffect, useState } from 'react';
import { Link as ReactLink, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { TailSpin } from 'react-loading-icons'
import {
  Button, Divider, Heading, Grid, GridItem, Link, Stack, Text, Spacer, VStack, StackDivider, HStack, Flex, Image,
  Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel
} from '@chakra-ui/react'
import PaypalMerchant from '../../components/checkoutoptions/paypalMerchant/PaypalMerchant';
import StripeMerchant from '../../components/checkoutoptions/stripeMerchant/StripeMerchant';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { createPaymentIntent, getSecret, getStatus } from '../../utils/stripe/stripeSlice';
import { getCart, getTotalPrice, getTotalQuantity } from '../../utils/cart/cartSlice';
import { getUser } from '../../utils/user/userSlice';
import { fetchUserAddress, getCurrentAddress } from '../../utils/useraddress/userAddressSlice';
import AddressForm from '../../components/forms/addressform/AddressForm';
import OrderSummary from '../../components/ordersummary/OrderSummary';
import RenderFromData from '../../components/renderfromdata/RenderFromData';
import useDesktopSize from '../../hooks/useDesktopSize';
// Icons
import PaypalIcon from '../../assets/images/paypal (1).svg';
import VisaIcon from '../../assets/images/visa.svg';
import MastercardIcon from '../../assets/images/mastercard.svg';
import AmericanExpressIcon from '../../assets/images/amex.svg';
import DiscoverIcon from '../../assets/images/discover.svg';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm();
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const cart = useSelector(getCart);
  const isDesktopSize = useDesktopSize();
  const totalPrice = useSelector(getTotalPrice);
  const totalQuantity = useSelector(getTotalQuantity);
  const address = useSelector(getCurrentAddress);
  const user = useSelector(getUser);
  const [paymentMethod, setPaymentMethod] = useState('');
  const secret = useSelector(getSecret);
  const options = {
    clientSecret: secret,
  };
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    dispatch(createPaymentIntent(cart));
    if (user)
      if (user.main_address)
        dispatch(fetchUserAddress(user.main_address));
  }, [cart, user, dispatch]);

  const onSubmit = async (address) => {
    console.log("Checkout data has been submitted");
  }
  
  const getPaymentButton = () => {
    // No address selected
    if (user && !address)
      return <Text>Please provide an address.</Text>
    // Paypal
    else if (paymentMethod === 0)
      return <PaypalMerchant />
    // Stripe
    else if (paymentMethod === 1)
      return (
        <VStack align="end">
          <Button disabled={isLoading || !secret} colorScheme='mainBlue' w="32%" id="submit" type="submit">
            <Text id="button-text">
              {isLoading ? <TailSpin /> : "Place Order"}
            </Text>
          </Button>
          {/* Show any error or success messages */}
          {message && <Text id="payment-message">{message}</Text>}
        </VStack>
      )
    // None selected
    else
      return <Text>Please select a payment method.</Text>
  }

  const getAddressSection = () => {
    if (!user)
      return (
        <AddressForm register={register} errors={errors} />
      )
    if (address)
      return (
        <>
          <Divider />
          <VStack spacing={1} align="start">
            <Text fontSize="17px" mb={1}>Ship To: </Text>
            <Text fontWeight="600" fontSize="16px" pl={3.5}>{address.first_name} {address.last_name}</Text>
            <Text pl={3.5}>{address.street}, {address.city}, {address.state} {address.zip}, {address.country}</Text>
          </VStack>
        </>
      )
    else
      return <Text>You have no addresses saved.</Text>
  }

  const renderCheckout = () => {
    if (!secret)
      return <TailSpin stroke="#3B0839" />;
    else return (
      <Grid
        templateAreas={isDesktopSize ?
          `"header header" 
          "main summary"`
          :
          `"header" 
          "main" 
          "summary"`}
        gridTemplateColumns={isDesktopSize ? '1.5fr 1.0fr' : '1fr'}
        gridTemplateRows={isDesktopSize ? '50px 1fr' : '1fr'}
        py={1} columnGap={12} width={isDesktopSize ? '70%' : '100%'}>

        <GridItem area={'header'}>
          <Heading size='lg'>Checkout</Heading>
        </GridItem>

        {/* This is for the edit address modal */}
        <Outlet />

        <form onSubmit={handleSubmit(onSubmit)}>
          <GridItem area={'main'}>
            <Flex divider={<StackDivider />}>
              <VStack spacing={6} w="full">
                <Stack w="full">
                  <HStack>
                    <Heading size="md">Shipping</Heading>
                    {user && <>
                      <Spacer />
                      <Link as={ReactLink} to='/checkout/addresses' variant="text-link">Edit</Link>
                    </>}
                  </HStack>
                  <Stack align="start">
                    {getAddressSection()}
                  </Stack>
                </Stack>
                <Stack w="full">
                  <Heading size="md" align="start">Payment Method</Heading>
                  <Accordion allowToggle onChange={(index) => { setPaymentMethod(index) }}>
                    <AccordionItem>
                      {({ isExpanded }) => (
                        <>
                          <h2>
                            <AccordionButton bg={isExpanded ? "mainPurple.150" : "white"}>
                              <HStack flex='1'>
                                <Text>PayPal</Text>
                                <Spacer />
                                <Image boxSize='50px' src={PaypalIcon} mr={5} alt='Paypal Icon' />
                              </HStack>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            On order placement, you will be redirected to PayPal to finish your transaction.
                          </AccordionPanel>
                        </>
                      )}
                    </AccordionItem>
                    <AccordionItem>
                      {({ isExpanded }) => (
                        <>
                          <h2>
                            <AccordionButton bg={isExpanded ? "mainPurple.150" : "white"}>
                              <HStack flex='1'>
                                <Text>Card</Text>
                                <Spacer />
                                <Image boxSize='50px' src={VisaIcon} alt='Visa Icon' />
                                <Image boxSize='50px' src={MastercardIcon} alt='Mastercard Icon' />
                                <Image boxSize='50px' src={AmericanExpressIcon} alt='American Express Icon' />
                                <Image boxSize='50px' src={DiscoverIcon} mr={5} alt='Discover Icon' />
                              </HStack>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <Elements key={secret} stripe={stripePromise} options={options}>
                              <StripeMerchant
                                clientSecret={secret}
                                setIsLoading={setIsLoading}
                                setMessage={setMessage} />
                            </Elements>
                          </AccordionPanel>
                        </>
                      )}
                    </AccordionItem>
                  </Accordion>
                </Stack>
              </VStack>
            </Flex>
          </GridItem>
        </form>

        <GridItem area={'summary'}>
          <Flex w="100%" wrap="wrap">
            <VStack align="start" spacing={6}>
              <Stack fontSize="15px" spacing={1} w="100%">
                <Heading size="md" align="start">Summary</Heading>
                <Divider />
                <HStack pt={1}>
                  <VStack align="start" spacing={1}>
                    <Text>Subtotal ({Number(totalQuantity)} items): </Text>
                    <Text>Shipping & Handling: </Text>
                    <Text>Tax: </Text>
                  </VStack>
                  <Spacer />
                  <VStack align="end" spacing={1}>
                    <Text>${Number(totalPrice).toFixed(2)}</Text>
                    <Text>$0</Text>
                    <Text>$0</Text>
                  </VStack>
                </HStack>
                <Divider />
                <HStack py={1}>
                  <Text fontWeight="600" fontSize="18px">Order Total: </Text>
                  <Spacer />
                  <Text fontWeight="600" fontSize="18px">${Number(totalPrice).toFixed(2)}</Text>
                </HStack>
                <Flex justify="right" zIndex={0}>
                  {getPaymentButton()}
                </Flex>
              </Stack>
              <Stack align="start">
                <OrderSummary />
              </Stack>
            </VStack>
          </Flex>
        </GridItem>
      </Grid >
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
