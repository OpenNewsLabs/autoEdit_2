var split = require('./split.js');


// var demoAudio = "/Users/pietropassarelli/Desktop/bk/Lotus_v4/backEnd/api/services/transcriber_watson/tmp/audio/norman_door.mp4.temp.wav";
var demoAudio = "/Users/pietropassarelli/Downloads/Bowman_trimmed.wav"
 var ffprobePath = "/Users/pietropassarelli/Dropbox/CODE/Vox/SubtitleBurner_project/SubtitleBurner/bin/ffprobe";
 var ffmpegPath = "/Users/pietropassarelli/Dropbox/CODE/Vox/TBVE/nwjs_backbone_sails_transcription/backEnd/api/services/bin/ffmpeg";
 
var tmpFolder ="./tmp"

 split(demoAudio,tmpFolder,ffmpegPath,ffprobePath, function(files) {
 	console.log("done splitting")
 	console.log(files)
 })