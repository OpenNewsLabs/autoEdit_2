var trimmer = require('./trimmer.js')



var demoVideo = "/Users/pietropassarelli/Dropbox/CODE/Vox/SubtitleBurner_project/SubtitleBurner_old/tests/captioned_norman_door.mp4";
var demoAudio = "/Users/pietropassarelli/Desktop/bk/Lotus_v4/backEnd/api/services/transcriber_watson/tmp/audio/norman_door.mp4.temp.wav";
var exampleFfmpegPath = "/Users/pietropassarelli/Dropbox/CODE/Vox/TBVE_components/bin/ffmpeg";

var input = 10;
var duration = 10;
var outName = "./timmedVideo.mp4";

trimmer.trim({
	src: demoAudio, 
	input: 10,
	duration:10,
	outputName:"./test_trimmed_norman.wav",
	ffmpegBin: exampleFfmpegPath,
	callback: function(){
		console.log("done")
	}
})
