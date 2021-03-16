import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import { Button, Heading } from '@chakra-ui/react';
import StreamForm from './StreamForm';
class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  }

  render() {
    return (this.props.stream) ?
      <div>
        <Heading 
          color="#383838" 
          m={{base: "5vw 0 0 15vw", lg:"5vw 0 0 22.5vw"}}
        >
          Edit a Stream
        </Heading>
        <StreamForm 
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit} 
        />
      </div>
     : 
      <Button 
        w="100%" 
        m="5% auto" 
        size="lg" 
        fontSize="1.5rem" 
        isLoading 
        colorScheme="red" 
        variant="ghost" 
      />
  }
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit); 