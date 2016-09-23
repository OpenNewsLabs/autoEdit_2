var MetadataReader = require("./video_metadata_reader/index.js");
module.exports = MetadataReader;


// var recodeSampleVideo = "/Users/pietropassarelli/INCOMING_FILES/autoEdit_demo_videos/RecodeLiveEditing_test/Bowman.mov";
// var exampleFfprobePath = "/Users/pietropassarelli/Dropbox/CODE/Vox/SubtitleBurner_project/SubtitleBurner/bin/ffprobe";
//
// MetadataReader.read({
//   file: recodeSampleVideo,
//   ffprobePath: exampleFfprobePath,
//   callback: function(resp){
//     console.log(JSON.stringify(resp));
//   }
// });


//Example output
// { filePathName: '/Users/pietropassarelli/Dropbox/CODE/Vox/transcriber_project/stt_gentle_component/norman_door_trimmed2.mp4',
//   date: '2016-05-24 16:26:15',
//   reelName: 'NA',
//   timecode: 'NA',
//   fps: '1001/48000',
//   duration: 7.048708 }
