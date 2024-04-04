import { useSelector  } from 'react-redux';
import { Box, Button, Divider, Heading, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { getUser } from '../../../../utils/user/userSlice';
import AccountSettingsForm from '../../../../components/forms/accountsettingsform/AccountSettingsForm';
import UpdatePasswordForm from '../../../../components/forms/updatepasswordform/UpdatePasswordForm';
import ConfirmationModal from '../../../../components/modals/confirmationmodal/ConfirmationModal';

//setError('registerInput', { type: 'custom', message: 'custom message' });
const AccountSettings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector(getUser);

  const onSubmit = async (accountData) => {
    onOpen();
    console.log("settings submitted");
    //const email = user.email;
    //dispatch(updateUser({ email, accountData }));
  };

  const getAccountType = () => {
    if (user !== null && user.google_id)
      return (
        <>
          <Box px={5} pt={5}>
            <Heading marginBottom="1rem">Edit profile</Heading>
            <Heading as="h4" size="md" marginBottom="0.5rem">
              Account Settings
            </Heading>
            <Text color="gray.500" fontSize="md" marginBottom="1.5rem">
              Your current Google account is <u>{user.email}.</u>
            </Text>
          </Box>
        </>
      )
    else return (
      <>
        <AccountSettingsForm />
        <UpdatePasswordForm />
      </>
    )
  }

  return (
    <>
      <ConfirmationModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} title="Delete account" />
      {getAccountType()}
      <Divider marginTop="2rem" marginBottom="2rem" orientation="horizontal" />
      <Box p={5}>
        <Stack spacing={0} marginBottom="1rem">
          <Heading as="h4" size="md">
            Danger zone
          </Heading>
          <Text color="gray.500" fontSize="sm">
            Delete your account and data
          </Text>
        </Stack>
        <Stack spacing={4} marginBottom="1rem">
          <Button type="submit" colorScheme="red" variant="outline" onClick={onSubmit}>
            Delete your account
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default AccountSettings;
