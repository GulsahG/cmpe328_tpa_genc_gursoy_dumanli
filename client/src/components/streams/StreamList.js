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
        <Link to={`/streams/edit/${stream.id}`}>
          <Button 
            background="#ecebe1" 
            color="#383838" 
            variant="solid"
            _hover={{background: "#C6B3D0"}} 
          >
            Edit
          </Button>
        </Link>
        <Link to={`/streams/delete/${stream.id}`}>
          <Button 
            background="#ecebe1" 
            color="#383838" 
            variant="solid"
            _hover={{background: "#C6B3D0"}} 
          >
            Delete
          </Button>
        </Link>
      </ButtonGroup>
    : null
    );
  }

  renderList() {
    return this.props.streams.map(stream => {
      return (
        stream.title ?
        <ListItem 
          borderBottom="3px solid #b19dd8" 
          w="88%" 
          display="flex"
          alignItems="center" 
          key={stream.id}
        >
          <ListIcon> 
            <CheckCircleIcon color="#17141f" />
          </ListIcon>
          <Flex 
            direction="column" 
            w="85%" 
            m="2% 2.5%"
          >
            <Link to={`/streams/${stream.id}`}>
              <Heading 
                as="h1" 
                color="#14a71d" 
                size="md" 
                align="left"
              >
                {stream.title}
              </Heading>
            </Link>
            <Text 
              align="left"
            >
              {stream.description}
            </Text>
          </Flex>
          {this.renderAdmin(stream)}
        </ListItem>
        : null
      );
    });
  }
  
  renderCreate() {
    return (
      (this.props.isSignedIn) ?
        <Link to="/streams/new">
          <Button
            m="2.5vw"
            variant="solid"
            float="right"
            background="#17141f" 
            color="white"
            _hover={{background: "#6441a4"}} 
          >
            Create Stream
          </Button>
        </Link>
      : 
      <Text
        m="2.5vw 0"
        fontSize="xl"
        float="right"
      >
        Sign-in to create a stream.
      </Text>
    );
  }

  render() {
    return (
      <List 
        m={{base: "5vw 0 0 15vw", md: "5vw 0 0 22.5vw"}} 
        w={{base: "75vw", md:"60vw"}}
        spacing={5}
      >
        <Link to="/videos">
          <Heading 
            m="5% 0" 
            as="h3" 
            color="#383838"
          >
            Videos
          </Heading>
        </Link>
        <Heading 
          m="5% 0" 
          as="h3" 
          color="#383838"
        >
          Streams
        </Heading>
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