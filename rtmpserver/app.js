const NodeMediaServer = require('node-media-server');
const ff = require('ffmpeg');

//const MediaRoot = process.env.MEDIA_ROOT || './media'
//const key = process.env.SECRET_KEY

const config = {
  rtmp: {
    port: 8080,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  },
  /*trans: {
    ffmpeg: FfmpegPath,
    tasks: [
      {
        app: 'live',
        vc: "copy",
        vcParam: ['-preset', 'slow', '-crf', '22'],
        mp4: true,
        mp4Flags: '[movflags=faststart]',
      }
    ]
  },*/
  /*auth: {
    play: true,
    publish: true,
    secret: key
  }*/
};

var nms = new NodeMediaServer(config)
nms.run();