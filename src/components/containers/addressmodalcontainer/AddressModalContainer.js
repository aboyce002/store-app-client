import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { getUserAddresses } from "../../../utils/useraddress/userAddressSlice";

const AddressModalContainer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("Edit Addresses");
  let navigate = useNavigate();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const closeModal = () => {
    onClose();
    navigate('/checkout');
  }

  return (
    <Modal onClose={closeModal} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={3}>
          <Outlet context={[title, setTitle, isOpen, onOpen, onClose]} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AddressModalContainer;
