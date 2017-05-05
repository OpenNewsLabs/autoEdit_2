var fs = require('fs');
var pocketsphinx_transcribe     = require("./index.js");

// main.videoToAudio('./test.mp4', function(res){
//   console.log(res)
// });

//NB: seems like the video file path needs to be relative to where to main.js module is, which root of the app.
//rather then being `../` relative to test file in tests folder.
//in otherwords if you write ` var video_file_name = '../test.mp4';` it will not find the file and will not work.
//TODO: look into weather this is an issue when packaging this as a module? perhaps Path module could be used to address this issue.

// var video_file_name = './test.mp4';
 var file = "/Users/pietropassarelli/Dropbox/CODE/NODE/offline_speech_to_text/tests/norman_door.mp4";

// main.convert_video_to_srt(video_file_name, function(res){
//   console.log(res)
//   main.writeToFile(video_file_name+".srt",res)
// });

// main.convert_video_to_hypertranscript(video_file_name, function(res){
//   	console.log(JSON.stringify(res,null,2));
//     // main.writeToFile(video_file_name+".json",JSON.stringify(res,null,2))
// });


pocketsphinx_transcribe({audio: file} , function(result) {
	console.log(result);
  // if(callback) { callback(null, result); } else { return result; }
});