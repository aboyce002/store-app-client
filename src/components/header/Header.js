import { createContext, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { Box, Button, IconButton, Image, Link, HStack, Spacer } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider } from '@chakra-ui/react';
import RenderFromData from '../../components/renderfromdata/RenderFromData';
import SearchBar from '../searchbar/SearchBar';
import CartButton from '../buttons/cardbutton/CartButton';
import MobileCategoryMenu from '../mobile/categorymenu/MobileCategoryMenu';
import SearchBarModal from '../mobile/searchbarmodal/SearchBarModal';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import { getUser } from '../../utils/user/userSlice';
import useDesktopSize from '../../hooks/useDesktopSize';

export const CurrentCategoryContext = createContext({
  categoryValue: '',
  setCategoryValue: () => { },
});

const Header = () => {
  // const { productList, fetchProductsByParams } = useContext(GlobalContext);
  // Context for passing the currently selected category value to the different search and select components
  const [categoryValue, setCategoryValue] = useState("");
  const value = useMemo(
    () => ({ categoryValue, setCategoryValue }),
    [categoryValue]
  );
  const isDesktopSize = useDesktopSize();
  const user = useSelector(getUser);

  const dataRender = () => {
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
      </Box>
    )
  }

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
          <HStack>
            <Box maxW={700} w={[200, 450, 700]}>
              <SearchBar />
            </Box>
            <CartButton />
          </HStack>
          <HStack spacing={10}>
            {dataRender()}
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
            <SearchBarModal />
            <MobileCategoryMenu />
            <CartButton />
            {dataRender()}
          </HStack>
        </HStack>
        <Breadcrumbs />
      </Box>
    )
  }

  // To-do: When acct is logged in, Show one box w/ name, one box w/ orders?\
  return (
    <CurrentCategoryContext.Provider value={value}>
      {useMemo(() => (
        renderDesktopOrMobile()
      ), [isDesktopSize])}
    </CurrentCategoryContext.Provider>
  )
}

export default Header;
