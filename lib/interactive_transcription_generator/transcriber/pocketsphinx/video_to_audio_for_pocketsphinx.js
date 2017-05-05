var Path        = require('path');
var spawn       = require('child_process').spawn;
var ffmpegPath  = require("../../../../config.js").ffmpegPath;
/**
* Function to convert video into audio compatible with pocketSphinx specs using ffmpeg.
* Takes in the path of the video file.
* the callback returns path of the audio file
* for simplicity the audio file has got the original video file name with `.temp.wav` added to it.
*/
function convert(path, cb) {
  var input_path = path;// Path.join(__dirname, path);
  var new_name = path + '.temp.wav';
  //TODO: change this as a config param
  var ffpmeg_path = ffmpegPath;
  console.log("inside video_to_audio_for_pocketsphinx.js")
  console.log(ffpmeg_path);
  console.log(new_name);
  console.log(input_path);
  //TODO: replace with fluent ffmpeg.
  var ffmpeg = spawn(ffpmeg_path, ['-y', '-i', input_path, '-acodec', 'pcm_s16le', '-ac', '1', '-ar', '16000', new_name]);

  ffmpeg.stdout.on('data', function(data) {
    console.log('' + data);
    console.log("Transcoding video to audio...")
  });

  ffmpeg.on('close', function(code) {
    console.log('finished converting video to audio');
    cb(new_name);
  });
}

module.exports.convert = convert;
