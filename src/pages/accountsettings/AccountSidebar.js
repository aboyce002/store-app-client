import React, { useState } from 'react'
import { Flex, Text, IconButton, Divider, Avatar, Heading } from '@chakra-ui/react'
import { FiCreditCard,  FiMapPin, FiMenu, FiInbox, FiUser, } from 'react-icons/fi'
import NavItem from './NavItem'

export default function Sidebar() {
  const [navSize, changeNavSize] = useState("large")
  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      bgColor="mainPurple.150"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.15)"
      borderRadius="10px"
      w={navSize === "small" ? "75px" : "220px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        as="nav"
      >
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: 'none' }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize === "small")
              changeNavSize("large")
            else
              changeNavSize("small")
          }}
        />
        <NavItem navSize={navSize} icon={FiUser} title="Account" description="Account Info" />
        <NavItem navSize={navSize} icon={FiMapPin} title="Addresses" />
        <NavItem navSize={navSize} icon={FiInbox} title="Orders" />
        <NavItem navSize={navSize} icon={FiCreditCard} title="Payment Methods" />
      </Flex>
    </Flex>
  )
}
