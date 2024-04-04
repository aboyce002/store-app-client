import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Heading, Text } from '@chakra-ui/react';
import { updateUser } from '../../../../utils/user/userSlice';

const AccountPaymentMethods = () => {
  //Not implemented
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (paymentSettings) => {
    dispatch(updateUser(paymentSettings));
  }

  return (
    <>
      <Heading marginBottom="1.5rem">Payment Methods</Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Text></Text>
      </form>
    </>
  )
}

export default AccountPaymentMethods;
