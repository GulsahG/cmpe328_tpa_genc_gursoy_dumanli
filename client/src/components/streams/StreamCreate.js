import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';
import { Heading } from '@chakra-ui/layout';
class StreamCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  }

  render() {
    return (
      <div>
        <Heading 
          as="h3" 
          color="#17141f" 
          m={{base: "5vw 0 0 15vw", lg:"5vw 0 0 22.5vw"}}
        >
          Create a Stream
        </Heading>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createStream })(StreamCreate);