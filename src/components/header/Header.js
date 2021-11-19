import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PayStripe from '../PayStripe';
import SearchBar from '../searchbar/SearchBar';
import { Box, HStack, Stack, VStack, Spacer, StackDivider, Input } from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi';

class Header extends Component {
  renderContent() {
    <Spacer/>
    switch (this.props.auth){ 
      case null:
        return <Box>Loading...</Box>;
      case false:
        return <Box><a href="/login">Log In</a></Box>;
      default:
        return [
            <Box key="1"><PayStripe /></Box>,
            <Box key="3" style={{ margin: '0 10px'}}>
              Credits: {this.props.auth.credits}
            </Box>,
            <Box key="2"><a href="/api/logout">Logout</a></Box>
        ];
    }
  }
  //To-do: When acct is logged in, Show one box w/ name and avatar, one box w/ orders?
  render() {
    return (
      <Box as="header" w="100%" role="contentinfo" sx={{ position: '-webkit-sticky', /* Safari */ position: 'sticky', top: '0', }}>
        <HStack className="topHeader" p={2} spacing="24px" color="white" bgGradient="linear(to-l, #7928CA,#FF0080)">
          <Box>
          <Link to={this.props.auth ? '/' : '/'} className="left logo"></Link>
            <Link to='/account' className="left">
              My Account
            </Link>
          </Box>
          <Box>
            <Link to='/' className="left logo">
              Home
            </Link>
          </Box>
            <SearchBar/>
          <Spacer/>
          <Box>
            <Link to='/checkout'>
              <FiShoppingCart/>
            </Link>
          </Box>
          <HStack>
            {this.renderContent()}
          </HStack>
        </HStack>

        <HStack className="topHeader" p={2} spacing="24px" bgGradient="linear(to-l, #FFFF00,#00FFFF)">
          <Box>
            <a href="/plushies">Plushies</a>
          </Box>
          <Box>
            <a href="/charms">Charms</a>
          </Box>
          <Box>
            <a href="/prints">Prints</a>
          </Box>
          <Box>
            <a href="/stickers">Stickers</a>
          </Box>
        </HStack>
      </Box>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
