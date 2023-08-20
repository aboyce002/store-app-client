import { Link as ReactLink } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Box, IconButton, Menu, MenuButton, MenuList, MenuItem, MenuGroup } from '@chakra-ui/react';

const MobileCategoryMenu = () => {
  return (
    <Box zIndex='2'>
      <Menu>
        <MenuButton as={IconButton} aria-label='Account' icon={<RxHamburgerMenu />} />
        <MenuList>
          <MenuGroup title='Categories'>
            <MenuItem color='#EAEAEA' as={ReactLink} to={{ pathname: "/search", search: "?condition=new" }}>New</MenuItem>
            <MenuItem as={ReactLink} to={{ pathname: "/search", search: "?category=plushies" }}>Plushies</MenuItem>
            <MenuItem as={ReactLink} to={{ pathname: "/search", search: "?category=charms" }}>Charms</MenuItem>
            <MenuItem as={ReactLink} to={{ pathname: "/search", search: "?category=prints" }}>Prints</MenuItem>
            <MenuItem as={ReactLink} to={{ pathname: "/search", search: "?category=stickers" }}>Stickers</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default MobileCategoryMenu;
