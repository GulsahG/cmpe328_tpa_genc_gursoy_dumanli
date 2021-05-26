import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream, createComment, fetchComments } from '../../actions';
import CommentForm from './CommentForm';
import { Button, Heading, Box } from '@chakra-ui/react';
import { List, ListItem, ListIcon, Flex, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from '@chakra-ui/icons';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  
  onSubmit = (formValues) => {
    this.props.createComment(formValues);
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchStream(id);
    this.props.fetchComments();
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
    console.log(this.props.comments);
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    if(this.player || !this.props.stream) {
      return;
    }

    const { id } = this.props.match.params;

    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  renderCreate() {
    const { id } = this.props.match.params;
    return (
      (this.props.isSignedIn) ?
      <div style={{width: '40vw', marginLeft: '20vw'}}>
        <Heading 
          as="h3" 
          color="#17141f" 
          m={{base: "5vw 0 0 0", lg:"5vw 0 0 0"}}
        >
          Add Comment
        </Heading>
        <CommentForm onSubmit={this.onSubmit} initialValues={{streamId: id}} />
      </div>
      : null
    );
  }

  renderList() {
    return this.props.comments ?
    this.props.comments.map(comment => {
      return (
        // eslint-disable-next-line eqeqeq
        comment.streamId == this.props.stream.id ?
        <ListItem 
          borderBottom="3px solid #b19dd8" 
          w="88%" 
          display="flex"
          alignItems="center" 
          key={comment.id}
        >
          <ListIcon> 
            <CheckCircleIcon color="#17141f" />
          </ListIcon>
          <Flex 
            direction="column" 
            w="85%" 
            m="2% 2.5%"
          >
            <Text 
              align="left"
            >
              {comment.text}
            </Text>
          </Flex>
        </ListItem>
        : null
      );
    })
    : null ;
  }

  render(){
    if(!this.props.stream) {
      return (
        <Button 
          w="100%" 
          m="5% auto" 
          size="lg" 
          fontSize="1.5rem" 
          isLoading 
          colorScheme="red" 
          variant="ghost" 
        />
      );
    }
    return (
      <Box 
        m={{base: "5vw 0 0 15vw", md: "5vw 0 0 22.5vw"}} 
        w={{base: "75vw", md: "60vw"}}
        p={2}
        d="flex"
        flexDir="column"
        alignItems="flex-start"
      >
        <Box
          w={{base: "65vw", md: "50vw"}}
        >
          <video 
            ref={this.videoRef}
            style={{ width: "100%", margin: "2.5vw 1.25vw" }}
            controls
          />
        </Box>
        <Heading 
          m={{base: "3vw 0", md: "1.5vw 0"}}  
          as="h1" 
          color="#14a71d" 
          size="lg" 
          align="left"
        >
          {this.props.stream.title}
        </Heading>
        <Heading 
          m={{base: "3vw 0", md: "1.5vw 0"}} 
          as="h1" 
          color="#17141f" 
          size="md" 
          align="left"
        >
          {this.props.stream.description}
        </Heading>
        {this.renderCreate()}
        <List 
          m={{base: "2.5vw 0 2.5vw 0", md: "2.5vw 0 2.5vw 0"}} 
          w={{base: "75vw", md:"60vw"}}
          spacing={5}
        >
          <Heading 
            m="2.5% 0" 
            as="h3" 
            color="#383838"
          >
            Comments
          </Heading>
          {this.renderList()}
        </List>
      </Box>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { 
    stream: state.streams[ownProps.match.params.id],
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
    comments: Object.values(state.comments)
  };
};


export default connect(mapStateToProps, { fetchStream, createComment, fetchComments })(StreamShow);