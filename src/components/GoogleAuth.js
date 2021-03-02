import React from 'react';
import { Button } from "@chakra-ui/react";
import { EmailIcon } from '@chakra-ui/icons';

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange();
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignIn = () => {
    this.auth.signIn();
  };

  onSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    return (
      (this.state.isSignedIn === null) ?
        null
      : (this.state.isSignedIn) ?
        <Button 
          size="lg" 
          colorScheme="red" 
          variant="solid" 
          leftIcon={<EmailIcon />}
          onClick={this.onSignOut}
          _focus={{
            boxShadow:
              "none",
          }}>
            Sign Out
        </Button>
      : 
      <Button 
        size= "lg"
        colorScheme="red" 
        variant="solid" 
        leftIcon={<EmailIcon />}
        onClick={this.onSignIn}
        _focus={{
            boxShadow:
              "none",
        }}>
          Sign In with Google
      </Button>
    );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;