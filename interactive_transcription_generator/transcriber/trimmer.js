/**
* @module trimmer
* @description trims a video or audio file 
* Used by sam_transcriber/split.js module.
* @author Pietro Passarelli 
* @example
 var trimmer = require('./index.js')
 trimmer.trim({
	src:"debate_test.wav", 
	input: 773,
	duration:20,
	outputName:"debate_test_trimmed.wav",
	callback: function(outputName, input){
		console.log("done! new file "+outputName+" starts at this point in original "+ input)
	}
})
* @requires ffmpeg-fluent - to trim the audio or video.
*/ 

var ffmpeg = require('fluent-ffmpeg');

/**
* @function trim
* @description Trims a video or audio file 
* @param {object} config -  The parameter containting attribute options.
* @param {string} config.src -  video or audio file path,relative to computer root 
* @param {number} config.input -  input point for cutting video or audio from 
* @param {number} config.duration - duration to cut video or audio for how long
* @param {string} config.outputName - desired name of the trimmed clip
* @returns {callback} config.callback - Optional callback to return when transcription has done processing. It returns output name and input.
* 
*/
var trim = function(config){

	var callback;

	//set callback as optional
	if(config.callback){
		callback = config.callback
	}

	//set ffmpeg bin path as optional
	if(config.ffmpegBin){
		//setting ffmpeg bin
		ffmpeg.setFfmpegPath(config.ffmpegBin);
	}else{
		console.warn("ffmpeg binary path not defined, so using system one. if available.")
	}

	//absolute file path relative to computer root
	var videoSrc = config.src; 
	//seconds or hh:mm:ss.mms
	var input = config.input;
	//seconds
	var duration = config.duration; 
	var outputName = config.outputName;

	//running ffmpeg 
	ffmpeg(videoSrc)
		.seekInput(input)
		.setDuration(duration)
		.output(outputName)
		.on('end', 
			function() {
		    	//optional callback 
		   		if(callback){
		   			//returning output name and input of cut
		   			callback(outputName, input)
		   		}
		  }).run();
}


module.exports = {
		trim : function(config){
		return trim(config);
	}//,
};