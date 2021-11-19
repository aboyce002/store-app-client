import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'
import { Stack, Spacer, Flex, Box, HStack } from '@chakra-ui/react'

class LogIn extends Component {
  renderContent() {
    switch (this.props.auth){ 
      case null:
        return <Box>Loading...</Box>;
      case false:
        return <Box><a href="/auth/google">Login With Google</a></Box>;
      default:
        return [
          <Redirect to='/'/>,
          <p>You are already logged in. Redirecting...</p>
        ];
  }
}

  render() {
    return (
      <HStack spacing="24px">
        <Link to={this.props.auth ? '/' : '/login'} className="left logo">
          Log in page
        </Link>
        <Box className="right">
          {this.renderContent()}
        </Box>
      </HStack>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(LogIn);
