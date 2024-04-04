import { Link as ReactLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Text, VStack } from '@chakra-ui/react';
import CheckoutAddressGrid from "../../address/CheckoutAddressGrid";
import RenderFromData from "../../renderfromdata/RenderFromData";
import { getCurrentAddress } from "../../../utils/useraddress/userAddressSlice";

const AddressListModal = () => {
  const address = useSelector(getCurrentAddress);

  return (
    <VStack spacing={4}>
      <RenderFromData
        data={address}
        ifNull={<Text>You have no addresses saved.</Text>}
        ifFalse={<Text>Error retrieving addresses.</Text>}
        ifEmpty={<Text>You have no addresses saved.</Text>}
        ifExists={<CheckoutAddressGrid />} />
      <Button as={ReactLink} to='/checkout/addresses/add'>New Address</Button>
    </VStack>
  )
}

export default AddressListModal;
