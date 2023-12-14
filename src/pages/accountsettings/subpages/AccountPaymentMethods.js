import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Heading, Text } from '@chakra-ui/react';
import { getUser, updateUser } from '../../../utils/user/userSlice';

const AccountPaymentMethods = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const onSubmit= async (paymentSettings) => {
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
