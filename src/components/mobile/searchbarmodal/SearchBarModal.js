import { Button, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import SearchCategorySelect from '../../searchbar/SearchCategorySelect';
import SearchBar from '../../searchbar/SearchBar';

const SearchBarModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton onClick={onOpen} icon={<FiSearch />} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search</ModalHeader>
          <ModalCloseButton as={Button} />
          <ModalBody>
            <SearchBar onClose={onClose}/>
          </ModalBody>

          <ModalFooter>
            <SearchCategorySelect />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SearchBarModal;
