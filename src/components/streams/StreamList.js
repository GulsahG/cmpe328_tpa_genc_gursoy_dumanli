import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions'; 
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { List, ListItem, ListIcon, Flex, Text, Heading, ButtonGroup, Button } from "@chakra-ui/react";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    return (
      (stream.userId && stream.userId === this.props.currentUserId) ?
      <ButtonGroup>
        <Button 
          background="#ecebe1" 
          color="#383838" 
          variant="solid"
          _hover={{background: "#C6B3D0"}} 
        >
          Edit
        </Button>
        <Button 
          background="#ecebe1" 
          color="#383838" 
          variant="solid"
          _hover={{background: "#C6B3D0"}} 
        >
          Delete
        </Button>
      </ButtonGroup>
    : null
    );
  }

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <ListItem 
          borderBottom="3px solid #A17CB8" 
          w="88%" 
          display="flex"
          alignItems="center" 
          key={stream.id}
        >
          <ListIcon> 
            <CheckCircleIcon color="#383838" />
          </ListIcon>
          <Flex direction="column" w="85%" m="2% 2.5%">
            <Text align="left">{stream.title}</Text>
            <Text align="left">{stream.description}</Text>
          </Flex>
          {this.renderAdmin(stream)}
        </ListItem>
      );
    });
  }
  
  renderCreate() {
    return (
      (this.props.isSignedIn) ?
        <Button
          variant="solid"
          float="right"
          background="#383838" 
          color="white"
          _hover={{background: "#6C4A7E"}} 
        >
          <Link to="/streams/new">
            Create Stream
          </Link>
        </Button>
      : null
    );
  }

  render() {
    return (
      <List 
        w="60vw" 
        m="5vw 0 0 22.5vw" 
        spacing={5}
      >
        <Heading m="5% 0" as="h2" color="#383838">Streams</Heading>
        {this.renderList()}
        {this.renderCreate()}
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);