import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { Stack, Spacer, Flex, Box, HStack, Button, Center, Text } from '@chakra-ui/react'

class LogIn extends Component {
  renderContent() {
    switch (this.props.auth){ 
      case null:
        return <Box>Loading...</Box>;
      case false:
        return <Box>            
        <a href="/auth/google">
          <Button w={'full'} variant={'outline'} leftIcon={<FcGoogle />}>
            <Center>
              <Text>Sign in with Google</Text>
            </Center>
          </Button>
        </a>
      </Box>;
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
