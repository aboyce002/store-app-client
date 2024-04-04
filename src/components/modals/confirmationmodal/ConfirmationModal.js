import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, FormControl, Modal, ModalOverlay, ModalContent, ModalBody, FormLabel, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton,
  PopoverHeader, PopoverBody, PopoverFooter, InputGroup, Input, InputRightElement, ModalFooter, ModalHeader, useToast
} from '@chakra-ui/react';
import ShowPasswordToggleButton from '../../buttons/showpasswordtogglebutton/ShowPasswordToggle';
import { getUser, updateUser, verifyUserPass } from '../../../utils/user/userSlice';

const ConfirmationModal = ({ isOpen, onOpen, onClose, data, title, error, onConfirm }) => {
  // Gets data of one product to display on the product page
  const { field, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [show, setShow] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const onSubmit = async (password) => {
    console.log("Verified account");
    const email = user.email;
    (dispatch(verifyUserPass({ email, password }))).then(() => {
      onClose();
      onConfirm();
    })
    return (
      toast({
        title: 'Error',
        description: { error },
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    )
  }

  const onDelete = async () => {
    console.log("Deleted account");
  }

  const googleAuthorize = () => {
    return (
      <ModalContent>
        <ModalHeader align="center">{title}</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel as="u" htmlFor="account_deletion_confirm">
              This will delete your account and erase all data; please be sure you want to do this.
            </FormLabel>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Popover>
            <PopoverTrigger>
              <Button colorScheme="red" mr={3}>
                Delete my Account
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Confirm</PopoverHeader>
              <PopoverBody>Are you sure you want to delete your account?</PopoverBody>
              <PopoverFooter>
                <Button type="submit" colorScheme="red" mr={3} onClick={onConfirm}>
                  Yes
                </Button>
                <Button colorScheme="red" mr={3} variant="outline" onClick={onClose}>
                  No
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>

          <Button colorScheme="red" variant="outline" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    )
  }

  const confirmPass = () => {
    return (
      <ModalContent>
        <ModalHeader align="center">{title}</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel htmlFor="password_confirm">
              Please enter your password
            </FormLabel>
            <InputGroup>
              <Input focusBorderColor="main.500" name="password_confirm" id="password_confirm" type={show ? 'text' : 'password'} placeholder="Enter password" />
              <InputRightElement width='3.5rem'>
                <ShowPasswordToggleButton show={show} setShow={setShow} />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" colorScheme='mainBlue' mr={3}>
            Confirm
          </Button>
          <Button colorScheme='mainBlue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        {user !== null && user.google_id ? googleAuthorize() : confirmPass()}
      </Modal>
    </form>
  );
}

export default ConfirmationModal;
