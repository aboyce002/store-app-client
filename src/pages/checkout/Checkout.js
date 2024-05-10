import { useState } from 'react';
import { Link as ReactLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { TailSpin } from 'react-loading-icons';
import {
  Button, Divider, Heading, Grid, GridItem, Link, Stack, Text, Spacer, VStack, StackDivider, HStack, Flex, Image,
  Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel
} from '@chakra-ui/react';
import PaypalButton from '../../components/buttons/paypalbutton/PaypalButton';
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { getSecret, getStatus } from '../../utils/stripe/stripeSlice';
import { getCart, getTotalPrice, getTotalQuantity } from '../../utils/cart/cartSlice';
import { getUser } from '../../utils/user/userSlice';
import { getCurrentAddress } from '../../utils/useraddress/userAddressSlice';
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

const Checkout = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const status = useSelector(getStatus);
  const cart = useSelector(getCart);
  const isDesktopSize = useDesktopSize();
  const totalPrice = useSelector(getTotalPrice);
  const totalQuantity = useSelector(getTotalQuantity);
  const address = useSelector(getCurrentAddress);
  const user = useSelector(getUser);
  const [paymentMethod, setPaymentMethod] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const secret = useSelector(getSecret);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const paymentElementOptions = {
    layout: "tabs"
  }

  const onSubmit = async (address) => {
    console.log("Checkout data has been submitted");
    if (paymentMethod === 1) {
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      setIsLoading(true);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: process.env.FRONTEND_URL + "/checkout/paymentsuccess"
        },
      });

      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error.type === "card_error" || error.type === "validation_error") {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }

      setIsLoading(false);
    }
  }

  const getPaymentButton = () => {
    // No address selected
    if (user && !address)
      return <Text>Please provide an address.</Text>
    // Paypal
    else if (paymentMethod === 0)
      return <PaypalButton />
    // Stripe
    else if (paymentMethod === 1)
      return (
        <VStack align="end">
          <Button disabled={isLoading || !secret} colorScheme='mainBlue' w="100%" type="submit">
            <Text id="button-text">
              {isLoading ? <TailSpin /> : "Place Order"}
            </Text>
          </Button>
          {/* Show any error or success messages */}
          {errorMessage && <Text id="payment-message">{errorMessage}</Text>}
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
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* This is for the edit address modal */}
        <Outlet />

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
          py={1} columnGap={12}>

          <GridItem area={'header'}>
            <Heading size='lg'>Checkout</Heading>
          </GridItem>

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
                            <PaymentElement id="payment-element" options={paymentElementOptions} />
                          </AccordionPanel>
                        </>
                      )}
                    </AccordionItem>
                  </Accordion>
                </Stack>
              </VStack>
            </Flex>
          </GridItem>

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
      </form>
    );
  }

  if (status === 'pending')
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
