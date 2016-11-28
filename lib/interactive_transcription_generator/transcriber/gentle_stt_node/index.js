/*
* @module gentle_stt_node
* @description SDK to connect to gentle STT API
* @description can be either used to allign existing plain text or to transcribe from scratch
* @example <caption> Example transcribing audio</caption>
var  transcribe =  require("./index.js")
var demo_audio ="audio_example.wav";

transcribe({audio: demo_audio}, function(resp){
	console.log(JSON.stringify(resp, null, '\t'))
})
* 
* @example <caption> Example aligning text to audio</caption>
var  transcribe =  require("./index.js")
var demo_audio ="audio_example.wav";
var demo_text = "./demo.txt"
transcribe({audio: demo_audio,text: demo_text}, function(resp){
	console.log(JSON.stringify(resp, null, '\t'))
})
* @todo refactor so that it is more similar to IBM STT Module splitting into 5 min chunks. refactoring this requires adjusting index.js inside `sam_transcriber`.
* @require gentle_stt
* @require parse_gentle_stt
*/
"use strict";

var send_to_gentle = require("./gentle_stt.js");
var gentleParser = require("./parse_gentle_stt.js");

/**
* @function transcribe
* @description transcribes 
* @param {object} config - The parameter containting attribute options.
* @param {object} config.audio - file path to audio 
* @param {object} config.text - optional can pass in text file used to allign text rather then generating automated transcription  
* @param {callback} cb - 
*/
function transcribe(config, cb){

	send_to_gentle(config, function(gentleJson){
		// finished transcribing 
		//parse lines to meet autoEdit2 specs 
		var lines = gentleParser(gentleJson);
		//return callback if presetn
		if(cb){
			cb(lines);
		}else{
			return lines;
		}
	});
}

module.exports = transcribe;