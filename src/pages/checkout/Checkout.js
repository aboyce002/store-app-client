import { useEffect, useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { TailSpin } from 'react-loading-icons'
import { Button, Checkbox, Divider, Heading, Grid, GridItem, Link, Radio, RadioGroup, Stack, Text, VStack, Image, useBreakpointValue } from '@chakra-ui/react'
import { PaymentElement, CardElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getCart, getTotalPrice } from '../../utils/cart/cartSlice';
import { createPaymentIntent, getSecret, getStatus } from '../../utils/stripe/stripeSlice';
import AddressForm from '../../components/addressform/AddressForm';
import OrderSummary from './OrderSummary';
import PaypalMerchant from '../../components/checkoutoptions/paypalMerchant/PaypalMerchant';
import RenderFromData from '../../components/renderfromdata/RenderFromData';

const Checkout = () => {
  const { field, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const dispatch = useDispatch();
  let status = useSelector(getStatus);
  const cart = useSelector(getCart);
  const isDesktopSize = useBreakpointValue({ base: false, lg: true });
  const totalPrice = useSelector(getTotalPrice);
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  const secret = useSelector(getSecret);
  const options = {
    clientSecret: secret,
  };
  const [paymentMethod, setPaymentMethod] = useState('1')

  useEffect(() => {
    //dispatch(createPaymentIntent(totalPrice));
  }, []);

  const onSubmit = async () => {

  }

  const renderProduct = () => {
    return (
      /*<Grid gridTemplateColumns={'1fr 7fr 1fr'} py={1} gap={4}>
      <Box></Box>
      <Stack divider={<StackDivider />}>
        <HStack align="end">
          <Heading as='h2' size='lg' align="left">Shopping Cart</Heading>
          <Spacer />
          <Box fontWeight="600" fontSize="18px">Price</Box>
        </HStack>
        <VStack divider={<StackDivider />}>{getCartProducts()}</VStack>
        <HStack fontSize="18px" py={2}>
          <Spacer />
          <Text>Subtotal ({Number(totalQuantity)} items):</Text>
          <Text fontWeight="600">${Number(totalPrice).toFixed(2)}</Text>
        </HStack>
      </Stack>
      <Flex align="flex-end">
        <Link to='/checkout'>
          <Button colorScheme='mainPurple' rightIcon={<TiArrowRightThick />} justify="flex-start">Checkout</Button>
        </Link>
      </Flex>
    </Grid>*/

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
        py={1} gap={4}>
        <GridItem area={'header'}>
          <Heading size='lg'>Checkout</Heading>
          <Divider />
        </GridItem>
        <GridItem area={'main'}>
          <form onSubmit={handleSubmit(onSubmit)}></form>
          <Stack>
            <Heading size="md">Ship To</Heading>
            <AddressForm />
            <Checkbox>Update address</Checkbox>
          </Stack>
        </GridItem>
        <GridItem area={'summary'}>
          <VStack>
            <OrderSummary />
            <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
              <Stack direction='column'>
                <Radio value='1'><Image width='120px' objectFit="cover" borderRadius='6px' src={require('../../assets/images/credit-card-images.png')} alt='Pay with credit/debit card' /></Radio>
                <Radio value='2'><Image width='120px' objectFit="cover" borderRadius='6px' src={require('../../assets/images/paypal-image.png')} alt='Pay with Paypal' /></Radio>
              </Stack>
            </RadioGroup>
            <PaypalMerchant />
            <Button>Pay Now</Button>
          </VStack>
        </GridItem>
      </Grid>
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
        ifExists={renderProduct()} />
    )
}

export default Checkout;
