import { createContext, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { Box, Button, IconButton, Image, Link, HStack, Spacer, Text } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider } from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoCaretDownOutline } from "react-icons/io5";
import CartButton from '../buttons/cartbutton/CartButton';
import RenderFromData from '../../components/renderfromdata/RenderFromData';
import SearchBar from '../searchbar/SearchBar';
import MobileCategoryMenu from '../mobile/MobileCategoryMenu';
import SearchBarModal from '../modals/searchbarmodal/SearchBarModal';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import { getUser } from '../../utils/user/userSlice';
import useDesktopSize from '../../hooks/useDesktopSize';

export const CurrentCategoryContext = createContext({
  categoryValue: '',
  setCategoryValue: () => { },
});

const Header = () => {
  const [categoryValue, setCategoryValue] = useState("");
  const value = useMemo(() => ({
    categoryValue,
    setCategoryValue
  }), [categoryValue]);
  const isDesktopSize = useDesktopSize();
  const user = useSelector(getUser);

  const renderDesktopOrMobile = () => {
    if (isDesktopSize) return (
      <Box sx={{ position: 'sticky', top: '0', zIndex: '2' }}>
        <HStack spacing={30} py={1} px={5}
          bgGradient='linear(to-r, #7E1F69, #3B0839)'
          textStyle="header">
          <Box minW={[0, 100, 140]} maxW={[0, 100, 140]}>
            <ReactLink to='/'>
              <Image objectFit="cover" src={require('../../assets/images/logo.png')} alt='Logo'></Image>
            </ReactLink>
          </Box>
          <Spacer />
          <HStack spacing={8} textStyle="headingLinks">
            <Link as={ReactLink} to={{ pathname: "/search", search: "?condition=new" }} _activeLink={{ color: 'white' }}>New</Link>
            <Link as={ReactLink} to={{ pathname: "/search", search: "?category=plushies" }} _activeLink={{ color: 'white' }}>Plushies</Link>
            <Link as={ReactLink} to={{ pathname: "/search", search: "?category=charms" }} _activeLink={{ color: 'white' }}>Charms</Link>
            <Link as={ReactLink} to={{ pathname: "/search", search: "?category=prints" }} _activeLink={{ color: 'white' }}>Prints</Link>
            <Link as={ReactLink} to={{ pathname: "/search", search: "?category=stickers" }} _activeLink={{ color: 'white' }}>Stickers</Link>
          </HStack>
          <Spacer />
          <HStack spacing={10}>
            <Box maxW={700} w={[200, 450, 700]}>
              <SearchBar />
            </Box>
            {loginRender()}
            <CartButton />
          </HStack>
        </HStack>
        <Breadcrumbs />
      </Box>
    )
    // All header text is condensed into icons for mobile
    else return (
      <Box sx={{ position: 'sticky', top: '0', zIndex: '2' }}>
        <HStack px={4}
          bgGradient='linear(to-r, #7E1F69, #3B0839)'
          textStyle="header">
          <Box w={150}>
            <ReactLink to='/'>
              <Image objectFit="cover" src={require('../../assets/images/logo.png')} alt='Logo'></Image>
            </ReactLink>
          </Box>
          <Spacer />
          <HStack spacing={3}>
            <MobileCategoryMenu />
            <SearchBarModal />
            {loginRender()}
            <CartButton />
          </HStack>
        </HStack>
        <Breadcrumbs />
      </Box>
    )
  }

  const loginRender = () => {
    return (
      <RenderFromData
        data={user}
        ifFalse={
          <HStack>
            <Button><ReactLink to="/login">Log In</ReactLink>
            </Button>
            <Button colorScheme="mainPurple" bgColor="white" variant="outline"><ReactLink to="/register">Sign Up</ReactLink></Button>
          </HStack>
        }
        ifExists={renderAccountMenu()} />
    )
  }

  const renderAccountMenu = () => {
    // Hamburger menu for mobile
    return (
      <Box zIndex='2'>
        <Menu>
          {isDesktopSize &&
            <MenuButton textStyle="headingLinks" fontSize='lg' aria-label='Account'>
              <HStack>
                <Text>Account</Text>
                <IoCaretDownOutline />
              </HStack>
            </MenuButton>
          }
          {!isDesktopSize &&
            <MenuButton as={IconButton} icon={<RxHamburgerMenu />} aria-label='Account' />
          }
          <MenuList zIndex='2'>
            <MenuGroup title='Account'>
              <MenuItem as={ReactLink} to='/account'>Settings</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <a href='/api/users/logout'>
              <MenuItem>Logout</MenuItem>
            </a>
          </MenuList>
        </Menu>
      </Box >
    )
  }

  // To-do: When acct is logged in, Show one box w/ name, one box w/ orders?
  return (
    <CurrentCategoryContext.Provider value={value}>
      {useMemo(() => (
        renderDesktopOrMobile()
      ), [isDesktopSize, user])}
    </CurrentCategoryContext.Provider>
  )
}

export default Header;
