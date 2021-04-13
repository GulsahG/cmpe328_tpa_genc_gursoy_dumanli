import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import { Button, Heading, Box } from '@chakra-ui/react';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
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
      </Box>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};


export default connect(mapStateToProps, { fetchStream})(StreamShow);