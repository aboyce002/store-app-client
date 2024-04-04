import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Modal, ModalOverlay, ModalCloseButton, ModalContent, ModalBody, ModalFooter, ModalHeader, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import { deleteUserAddress, getAddressFromId } from "../../../utils/useraddress/userAddressSlice";
import RenderFromData from "../../renderfromdata/RenderFromData";

const DeleteAddressConfirmationModal = () => {
  const { field, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addressId } = useParams();
  const address = useSelector(state => getAddressFromId(state, addressId));
  let navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("the delete modal exists");
    onOpen();
  }, [onOpen]);

  const closeModal = () => {
    onClose();
    navigate('/account/addresses');
  }

  const deleteAddress = async () => {
    console.log("Deleted address");
    dispatch(deleteUserAddress({ id: address.id })).then(() => {
      return (
        toast({
          title: 'Address deleted successfully',
          status: 'success',
          duration: 4000,
          isClosable: true,
        }),
        closeModal())
    })
      .catch(error => {
        return (
          toast({
            title: 'Error',
            description: error.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          }))
      })
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader align="center">Delete this address?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RenderFromData
            data={address}
            ifNull={<Text>No address to delete.</Text>}
            ifFalse={<Text>Error retrieving address; please try again later.</Text>}
            ifEmpty={<Text>No address to delete.</Text>}
            ifExists={
              <VStack align="start" px={10} spacing={0}>
                <Text>{address?.first_name} {address?.last_name}</Text>
                <Text>{address?.street}</Text>
                <Text>{address?.city}, {address?.state} {address?.zip}</Text>
                <Text>{address?.country}</Text>
              </VStack>
            } />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='red' mr={3} onClick={() => deleteAddress()}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteAddressConfirmationModal;
