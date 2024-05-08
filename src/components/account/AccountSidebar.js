import React, { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { FiMapPin, FiInbox, FiUser, } from 'react-icons/fi'
import NavItem from './NavItem'

export default function Sidebar() {
  // <NavItem navSize={navSize} icon={FiCreditCard} title="Payment Methods" link="/account/paymentmethods"/>
  // Add payment methods eventually?

  const [navSize, changeNavSize] = useState("large")

  return (
    <Flex
      pos="sticky"
      left="5"
      h="32vh"
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
        <NavItem navSize={navSize} icon={FiUser} title="Account" link="/account" />
        <NavItem navSize={navSize} icon={FiMapPin} title="Addresses" link="/account/addresses" />
        <NavItem navSize={navSize} icon={FiInbox} title="Orders" link="/account/orders" />
      </Flex>
    </Flex>
  )
}
