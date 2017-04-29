var path               = require("path");
// var ffmpegPath        = require('ffmpeg-static').path;
// var ffprobePath       = require('ffprobe-static').path;

module.exports = {
  serverUrl: '',
  appName: 'autoEdit 2',
  ffmpegPath: path.join(process.cwd(),"lib/bin","ffmpeg"),
  ffprobePath: path.join(process.cwd(),"lib/bin","ffprobe"),
};
