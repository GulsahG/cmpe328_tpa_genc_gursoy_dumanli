import React from 'react';
import { List, ListItem, Flex, Heading } from "@chakra-ui/react";
import ReactPlayer from 'react-player';
import UploadVideo from './UploadVideo';
import videos from '../../apis/videos';

class VideoList extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
        videos: []
    };
  }

  importAll(r) {
    return r.keys().map(r);
  }

  componentWillMount() {
    videos.get('/videos')
      .then(res => {
        console.log(res.data.map(video => video.url))
        let urlArr = res.data.filter(video => video.url.endsWith(".mp4"))
        this.setState({ videos: urlArr.map(video => video.url)});
      })
  }

  renderList() {
    return this.state.videos.map(video => {
      return (
        <ListItem 
          borderBottom="3px solid #b19dd8" 
          w="88%" 
          display="flex"
          alignItems="center" 
          key={this.state.videos.indexOf(video) + 1}
        >
          <Flex 
            direction="column" 
            w="100%" 
            m="2% 0"
            p="1.5%"
            justify="center"
            alignItems="center"
          >
            <Heading 
              align="left"
              as="h3"
              m="1vw"
            >
              {this.state.videos.indexOf(video) + 1}
            </Heading>
            <ReactPlayer
              className='react-player fixed-bottom'
              url= {video}
              width='auto'
              height='75vh'
              controls = {true}
            />
          </Flex>
        </ListItem>
      );
    });
  }

  render() {
    return (
      <List 
        m={{base: "5vw 0 5vw 15vw", md: "5vw 0 7.5vw 22.5vw"}} 
        w={{base: "75vw", md:"60vw"}}
        spacing={5}
      >
        <Heading 
          m="5% 0" 
          as="h1" 
          color="#383838"
        >
          Videos
        </Heading>
        {this.renderList()}
        <UploadVideo />
      </List>
    );
  }
}

export default VideoList;