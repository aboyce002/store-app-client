import { Button, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import SearchBar from '../searchbar/SearchBar';
const MobileSearchBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton onClick={onOpen} icon={<FiSearch />} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SearchBar />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>X</Button>
            <Button variant='outline'>New</Button>
            <Button variant='outline'>Plushies</Button>
            <Button variant='outline'>Charms</Button>
            <Button variant='outline'>Prints</Button>
            <Button variant='outline'>Stickers</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MobileSearchBar;
