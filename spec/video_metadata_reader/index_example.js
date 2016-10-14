var metadataReader = require('./index.js');

// var sampleVideo = "/Users/pietropassarelli/Dropbox/CODE/Vox/transcriber_project/stt_gentle_component/norman_door_trimmed2.mp4";

var recodeSampleVideo = "/Users/pietropassarelli/INCOMING_FILES/autoEdit_demo_videos/RecodeLiveEditing_test/Bowman.mov";

// var exampleFfprobePath = "/Users/pietropassarelli/Dropbox/CODE/Vox/SubtitleBurner_project/SubtitleBurner/bin/ffprobe";
// //I don't think you need ffmpeg bin for this module, but not sure how to test it
// var exampleFfmpegPath = "/Users/pietropassarelli/Desk top/nwjs_transcription_rnd/transcriber/bin/ffmpeg";
// ffmpeg.setFfmpegPath(exampleFfmpegPath);

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

// //Complete list of metadata returned by ffprobe
// metadataReader.readMetadata({
//   file: recodeSampleVideo,
//   ffprobePath: exampleFfprobePath,
//   callback: function(resp){
//     console.log(JSON.stringify(resp));
//   }
// });




// metadataReader.readMetadata(config);

// var expectedResult = { filePathName: '/Users/pietropassarelli/Dropbox/CODE/Vox/transcriber_project/stt_gentle_component/norman_door_trimmed2.mp4',
//   date: '2016-05-24 16:26:15',
//   reelName: 'NA',
//   timecode: 'NA',
//   fps: '1001/48000',
//   duration: 7.048708 }


// expectedResultsRecode =
// { filePathName: '/Users/pietropassarelli/INCOMING_FILES/autoEdit_demo_videos/RecodeLiveEditing_test/Bowman.mov',
//   date: '2016-02-18 16:38:20',
//   reelName: 'time',
//   timecode: '00:01:18:56',
//   fps: '1/60000',
//   duration: 2287.285 }
