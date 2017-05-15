/*
* @module gentle_stt_node
* @description SDK to use pocketsphinx 
* @todo refactor with promisses. 
* @example <caption> Example transcribing audio</caption>

var pocketsphinx_transcribe = require("./pocketsphinx/index.js");

pocketsphinx_transcribe({audio: file} , function(result) {
      console.log(result);
});

* 
*/

"use strict";
//pockesphinx needs audio to be converted in a specific way fot it to be recognised by stt. 
var audioToText           = require('./pocketsphinx.js');
var textToHypertranscript = require('./pocketsphinx_converter.js');
var videoToAudio          = require('./video_to_audio_for_pocketsphinx.js');

/**
* @function transcribe
* @description transcribes 
* @param {object} config - The parameter containting attribute options.
* @param {object} config.audio - file path to audio 
* @param {callback} cb - 
*/
function  transcribe(config, cb){
	console.log("pocketsphinx: getting started");
	// console.log(config.audio);
	videoToAudio.convert(config.audio, config.audioFile, function(audio_filename){
		console.log("pocketsphinx: video to audio");
		// console.log(audio_filename);
		audioToText(audio_filename, function(text){
			console.log("pocketsphinx: audio to text");
			// console.log(text);
			textToHypertranscript.convert(text, function(error, hp){
				console.info("pocketsphinx: convert to autoEdit json");
				// console.log(JSON.stringify(hp,null,2));
				if(error){
					//TODO: handle error
				}else{
					if(cb){
		  				cb(hp);
		  			}else{
		  				return hp;
		  			}
				}
	  			
  			});
		});
	});
}

module.exports = transcribe;