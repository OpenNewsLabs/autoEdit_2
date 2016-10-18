var metadataReader = require('./index.js');

var recodeSampleVideo = "/Users/pietropassarelli/INCOMING_FILES/autoEdit_demo_videos/RecodeLiveEditing_test/Bowman.mov";

// config = {};
// config.file = recodeSampleVideo;
// config.ffprobePath = exampleFfprobePath;
// config.callback = function(resp){
//   console.log(JSON.stringify(resp));
// };

metadataReader.read({
  file: recodeSampleVideo,
  ffprobePath: exampleFfprobePath,
  callback: function(resp){
    console.log(JSON.stringify(resp));
  }
});


// { 
// 	 filePathName: '/Users/pietropassarelli/INCOMING_FILES/autoEdit_demo_videos/RecodeLiveEditing_test/Bowman.mov',
//   date: '2016-02-18 16:38:20',
//   reelName: 'time',
//   timecode: '00:01:18:56',
//   fps: '1/60000',
//   duration: 2287.285 
// }
