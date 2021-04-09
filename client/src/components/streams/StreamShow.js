import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import { Button, Heading, Box } from '@chakra-ui/react';

class StreamShow extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
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
        w={{base: "75vw", md:"60vw"}}
        p={2}
        d="flex"
        flexDir="column"
        alignItems="flex-start"
      >
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