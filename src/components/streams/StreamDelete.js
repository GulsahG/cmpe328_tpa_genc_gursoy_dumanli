import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';
import { Button } from '@chakra-ui/react';

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onDelete = () => {
    const id = this.props.match.params.id;
    this.props.deleteStream(id);
  }

  customProps = {
    title: "Delete Stream",
    body: "Are you sure you want to delete the stream with the title: ",
    buttonOne: <Button onClick={this.onDelete} colorScheme="red" mr={3}>Delete</Button>,
    buttonTwo: <Link to="/"><Button variant="ghost">Cancel</Button></Link>
  }

  render() {
    return (
      <Modal 
        title={this.customProps.title} 
        body={`${this.customProps.body} "${this.props.stream ? this.props.stream.title : ''}" ?`} 
        buttonOne={this.customProps.buttonOne}
        buttonTwo={this.customProps.buttonTwo}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete); 