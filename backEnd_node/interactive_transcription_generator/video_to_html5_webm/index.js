//https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/issues/274

var ffmpeg = require('fluent-ffmpeg');
/**
* Takes in a config object with propreties: src, outputName, ffmpegBin and optional callback.
*/

var convert = function(config){

	var videoSrc = config.src;
	var outputName = config.outputName;

	//declaring it outisde for scope reasons.
	var callback ;
	if(config.callback){
		//optional callback
		 callback = config.callback;
	}

	if(config.ffmpegBin){
		//setting ffmpeg bin
		ffmpeg.setFfmpegPath(config.ffmpegBin);
	}else{
		console.warn("ffmpeg binary path not defined, so using system one. if available.")
	}

	var command = ffmpeg(videoSrc)
	    .output(outputName)
	     .withVideoCodec('libvpx')
	 	.addOptions(['-qmin 0', '-qmax 50', '-crf 5'])
	  	.withVideoBitrate(1024)
	  	.withAudioCodec('libvorbis')
	    .on('end',
		    function(){
		      if(callback){
		        callback(outputName)
		      }else{
		        //  console.log('Finished processing');
		      }
	    })
	    .run();
	 // return output;
}

module.exports = {
		convert : function(config){
		return convert(config);
	}//,
};
