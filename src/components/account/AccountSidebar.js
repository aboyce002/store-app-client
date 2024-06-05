import React, { useState } from 'react'
import { Flex, Heading, Divider, VStack } from '@chakra-ui/react'
import { FiMapPin, FiInbox, FiUser, } from 'react-icons/fi'
import NavItem from './NavItem'

export default function Sidebar() {
  // <NavItem navSize={navSize} icon={FiCreditCard} title="Payment Methods" link="/account/paymentmethods"/>
  // Add payment methods eventually?

  const [navSize, changeNavSize] = useState("large")

  return (
    <Flex
      h="240px"
      align="stretch"
      marginTop="2.5vh"
      bgColor="mainPurple.150"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.15)"
      borderRadius="10px"
      w={navSize === "small" ? "75px" : "220px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <VStack alignItems="center">
        <Heading as='h2' align="center" size='md' pt={3}>Account</Heading>
        <Divider />
        <NavItem navSize={navSize} icon={FiUser} title="Settings" link="/account" />
        <NavItem navSize={navSize} icon={FiMapPin} title="Addresses" link="/account/addresses" />
        <NavItem navSize={navSize} icon={FiInbox} title="Orders" link="/account/orders" />
      </VStack>
    </Flex>
  )
}
