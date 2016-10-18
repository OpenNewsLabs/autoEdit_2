/**
* @file trims a video or audio file 
* Used by sam_transcriber/split.js module.
* use `ffmpeg-fluent` and trims audio or video.
* example usage

```
var trimmer = require('./index.js')

trimmer.trim({
	src:"debate_test.wav", 
	input: 773,
	duration:20,
	outputName:"debate_test_trimmed.wav",
	callback: function(){
		console.log("done")
	}
})
```
*/ 

var ffmpeg = require('fluent-ffmpeg');
var command = ffmpeg();


/**
*
*
*/
var trim = function(config){

	var callback;

	if(config.callback){
		callback = config.callback
	}

	if(config.ffmpegBin){
		//setting ffmpeg bin
		ffmpeg.setFfmpegPath(config.ffmpegBin);
	}else{
		console.warn("ffmpeg binary path not defined, so using system one. if available.")
	}

	//set ffmpeg bin path if optional

	//absolute file path relative to computer root
	var videoSrc= config.src; 
	//seconds or hh:mm:ss.mms
	var input = config.input;
	//seconds
	var duration = config.duration; 
	var outputName = config.outputName;


	ffmpeg(videoSrc)
				.seekInput(input)
				.setDuration(duration)
				.output(outputName)
				.on('end', 
					function() {
				    	// console.log("Timmer inside split");
				    	// console.log(outputName)
				   		if(callback){
				   			// console.log("went into callback")
				   			callback(outputName, input)
				   		}
				  }).run();
				 // return output;
}

/**
* to test test cutting video in isolation uncomment following code 
* and make sure you have a file `debate_test.mp4` in the same folder
*/


module.exports = {
		trim : function(config){
		return trim(config);
	}//,
};