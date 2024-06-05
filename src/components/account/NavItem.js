import React from 'react'
import { Link as ReactLink } from 'react-router-dom';
import { Flex, Text, Icon, Link, Menu, MenuButton, Center } from '@chakra-ui/react'

export default function NavItem({ icon, title, description, link, active, navSize }) {
  return (
    <Flex w="100%">
      <Menu>
        <Link as={ReactLink} to={link}
          p={3}
          _hover={{ textDecor: 'none', backgroundColor: "mainPurple.200" }}
          w="100%"
        >
          <MenuButton w="100%">
            <Flex alignItems="center">
              <Icon as={icon} fontSize="lg" color="gray.600" />
              <Text textStyle="header" fontSize="lg" color="gray.700" ml={5} display={navSize === "small" ? "none" : "flex"}>{title}</Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  )
}
