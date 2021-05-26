import React from 'react';
import videos from '../../apis/videos';
import { Button, Input, Text } from "@chakra-ui/react";
import { connect } from 'react-redux';

class UploadVideo extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedFile: null
    };
  }

  onChangeHandler = (event: any) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    const { selectedFile } = this.state;
    formData.append('inputFile', selectedFile);
    videos.post('/videos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }})
      .then(res => {
        console.warn(res);
      })
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <Text
              m="1vw 0"
              fontSize="xl"
            >
              Upload a video: 
            </Text>
            {(this.props.isSignedIn) ?
            <Input 
              m= {{sm: "4vw 0 0 4vw", md: "3vw 0 0 3vw", lg: "2vw 0 0 2vw"}} 
              type="file" 
              accept="video/mp4" 
              name="file" 
              onChange={this.onChangeHandler} 
              variant="unstyled"
            />
            : 
            <Text
              m= {{sm: "4vw 0 0 4vw", md: "3vw 0 0 3vw", lg: "2vw 0 0 2vw"}} 
              fontSize="xl"
            >
              Sign-in to upload videos.
            </Text>}
          </label>
          <Button 
            background="#b19dd8"
            _hover={{background: "#6441a4", color: "white"}}
            color="#17141f" 
            size="md" 
            m= {{sm: "6vw 0 0 0", md: "5vw 0 0 0", lg: "3vw 0 0 0"}}
            type="submit"
          >
            Upload
          </Button>
        </form>
      </div>
    );
  }
};


const mapStateToProps = (state) => {
  return { 
    isSignedIn: state.auth.isSignedIn
  };
}

export default connect(mapStateToProps)(UploadVideo);