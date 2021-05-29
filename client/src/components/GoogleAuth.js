/* global gapi */
import React from 'react';
import { Button } from "@chakra-ui/react";
import { EmailIcon } from '@chakra-ui/icons';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    (isSignedIn) ? 
      this.props.signIn(this.auth.currentUser.get().getId()) 
    : 
      this.props.signOut();
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    return (
      (this.props.isSignedIn === null) ?
        null
      : (this.props.isSignedIn) ?
        <Button 
          size="lg"
          background="#d23636"
          colorScheme="red" 
          variant="solid" 
          leftIcon={<EmailIcon />}
          onClick={this.onSignOutClick}
          _focus={{
            boxShadow:
              "none",
          }}
        >
          Sign Out
        </Button>
      : 
      <Button 
        size="lg"
        colorScheme="red" 
        variant="solid" 
        leftIcon={<EmailIcon />}
        onClick={this.onSignInClick}
        _focus={{
          boxShadow:
            "none",
        }}
      >
        Sign In with Google
      </Button>
    );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(
  mapStateToProps, 
  { signIn, signOut }
)(GoogleAuth);