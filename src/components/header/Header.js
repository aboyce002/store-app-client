import React from 'react';
import { useSelector } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { TailSpin } from 'react-loading-icons';
import SearchBar from '../searchbar/SearchBar';
import { Box, Button, IconButton, Image, ImageLink, Link, HStack, Spacer, useBreakpointValue } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FiSearch } from 'react-icons/fi';
import { getUser } from '../../utils/user/userSlice';

const Header = () => {
  // const { productList, fetchProductsByParams } = useContext(GlobalContext);
  const isDesktopSize = useBreakpointValue({ base: false, lg: true }); 
  console.log("desktop?: ", isDesktopSize);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector(getUser);

  const renderAccountMenu = () => {
    switch (user){ 
      case null:
        return <TailSpin/>;
      case false:
        return <Box><ReactLink to="/login">Log In</ReactLink> <ReactLink to="/register">Register</ReactLink></Box>;
      default:
        // Hamburger menu for mobile
        return (
          <Menu>
            {isDesktopSize &&
              <MenuButton>
                Account
              </MenuButton>
            }
            {!isDesktopSize &&
              <MenuButton as={IconButton} aria-label='Account' icon={<FiUser />} />
            }
            <MenuList zIndex='2'>
              <MenuGroup title='Account'>
                <MenuItem as={ReactLink} to='/account'>Settings</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <a href='/api/logout'>
                <MenuItem>Logout</MenuItem>
              </a>
            </MenuList>
          </Menu>
        )
    }
  }

  const mobileCategoryMenu = () => {
    return <Menu>
      <MenuButton as={IconButton} aria-label='Account' icon={<RxHamburgerMenu />} />
      <MenuList>
        <MenuGroup title='Categories'>
          <MenuItem color='#EAEAEA' as={ReactLink} to={{ pathname: "/search", search: "?condition=new"}}>New</MenuItem>
          <MenuItem as={ReactLink} to={{ pathname: "/search", search: "?category=plushies"}}>Plushies</MenuItem>
          <MenuItem as={ReactLink} to={{ pathname: "/search", search: "?category=charms"}}>Charms</MenuItem>
          <MenuItem as={ReactLink} to={{ pathname: "/search", search: "?category=prints"}}>Prints</MenuItem>
          <MenuItem as={ReactLink} to={{ pathname: "/search", search: "?category=stickers"}}>Stickers</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  }

  const mobileSearchBar = () => {
    return <>
      <IconButton onClick={onOpen} icon={<FiSearch/>} />

      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Search</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SearchBar />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>X</Button>
          <Button variant='outline'>New</Button>
          <Button variant='outline'>Plushies</Button>
          <Button variant='outline'>Charms</Button>
          <Button variant='outline'>Prints</Button>
          <Button variant='outline'>Stickers</Button>
        </ModalFooter>
      </ModalContent>
      </Modal>
    </>
  }

  const cartButton = () => {
    return <Link as={ReactLink} to='/cart'>
      <IconButton aria-label='Cart' icon={<FiShoppingCart/>}/>
    </Link>
  }

  // To-do: When acct is logged in, Show one box w/ name, one box w/ orders?\
  if (isDesktopSize) return (
    <HStack spacing="35px" py={1} px={20}
      bgGradient='linear(to-r, #7E1F69, #3B0839)' 
      sx={{ position: 'sticky', top: '0', zIndex: '2' }}
      textStyle="header">
      <Box w={[0, 100, 160]}>
        <ReactLink to='/'>
          <Image objectFit="cover" src={require('../../assets/images/logo.png')} alt='Logo'></Image>
        </ReactLink>
      </Box>
      <Spacer/>
      <HStack spacing="25px" textStyle="headingLinks">
        <Link as={ReactLink} to={{ pathname: "/search", search: "?condition=new"}} _activeLink={{ color: 'white' }}>New</Link>
        <Link as={ReactLink} to={{ pathname: "/search", search: "?category=plushies"}} _activeLink={{ color: 'white' }}>Plushies</Link>
        <Link as={ReactLink} to={{ pathname: "/search", search: "?category=charms"}} _activeLink={{ color: 'white' }}>Charms</Link>
        <Link as={ReactLink} to={{ pathname: "/search", search: "?category=prints"}} _activeLink={{ color: 'white' }}>Prints</Link>
        <Link as={ReactLink} to={{ pathname: "/search", search: "?category=stickers"}} _activeLink={{ color: 'white' }}>Stickers</Link>
      </HStack>
      <Spacer/>
      <Box w={[200, 450, 700]}>
        <SearchBar />
      </Box>
        {cartButton()}
        {renderAccountMenu()}
    </HStack>
  )
  // All header text is condensed into icons for mobile
  else return (
    <>
      <HStack px={4}
        bgGradient='linear(to-r, #7E1F69, #3B0839)' 
        sx={{ position: 'sticky', top: '0', zIndex: '2' }}
        textStyle="header">
        <Box w={150}>
          <ReactLink to='/'>
            <Image objectFit="cover" src={require('../../assets/images/logo.png')} alt='Logo'></Image>
          </ReactLink>
        </Box>
        <Spacer/>
        <HStack spacing={3}>
          {mobileSearchBar()}
          {cartButton()}
          {mobileCategoryMenu()}
          {renderAccountMenu()}
        </HStack>
      </HStack>
      <HStack>
        
      </HStack>
    </>
  )
}

export default Header;
