import { IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, useDisclosure, Text, Container, Center } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import SearchCategorySelect from '../../searchbar/SearchCategorySelect';
import SearchBar from '../../searchbar/SearchBar';

const SearchBarModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton onClick={onOpen} icon={<FiSearch />} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent maxW={"calc(90vw)"} bg='transparent' boxShadow='none'>
          <Container bg='white' boxShadow='md' borderRadius='md'>
            <ModalHeader>
              <SearchBar onClose={onClose} />
            </ModalHeader>

            <ModalBody mb={2}>
              <SearchCategorySelect />
            </ModalBody>
          </Container>
          <Center>
            <Text color="white" textShadow='0 0 20px black' mt={3} onClick={onClose}>Close</Text>
          </Center>
        </ModalContent>

      </Modal>
    </>
  )
}

export default SearchBarModal;
