/*
* @module gentle_stt_node
* @description SDK to use pocketsphinx 
* @description 
* @example <caption> Example transcribing audio</caption>
*
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



// var  testDemo = [ [ { start: 0.18, end: 1.71, text: 'how do you destroy i said' },
//     { start: 2.05, end: 2.65, text: 'i needed' } ],
//   [ { start: 0.19, end: 0.34, text: 'how' },
//     { start: 0.35, end: 0.51, text: 'do' },
//     { start: 0.52, end: 0.89, text: 'you' },
//     { start: 0.9, end: 1.26, text: 'destroy' },
//     { start: 1.27, end: 1.49, text: 'i' },
//     { start: 1.5, end: 1.7, text: 'said' },
//     { start: 2.06, end: 2.24, text: 'i' },
//     { start: 2.25, end: 2.64, text: 'needed' } ] ];


var  testDemo =    [
{
	"id": 0,
	"speaker": "Unnamed Speaker",
	"paragraph": [
	{
		"line": [
		{
			"id": 0,
			"text": "running",
			"startTime": 0.9,
			"endTime": 1.23
		},
		{
			"id": 1,
			"text": "a",
			"startTime": 1.23,
			"endTime": 1.3
		},
		{
			"id": 2,
			"text": "test",
			"startTime": 1.3,
			"endTime": 1.87
		},
		{
			"id": 3,
			"text": "to",
			"startTime": 1.93,
			"endTime": 2.07
		},
		{
			"id": 4,
			"text": "see",
			"startTime": 2.07,
			"endTime": 2.48
		},
		{
			"id": 5,
			"text": "if",
			"startTime": 2.56,
			"endTime": 3.04
		},
		{
			"id": 6,
			"text": "%HESITATION",
			"startTime": 3.81,
			"endTime": 4.38
		},
		{
			"id": 7,
			"text": "the",
			"startTime": 4.45,
			"endTime": 4.54
		},
		{
			"id": 8,
			"text": "program",
			"startTime": 4.54,
			"endTime": 4.91
		},
		{
			"id": 9,
			"text": "I",
			"startTime": 4.91,
			"endTime": 5.02
		},
		{
			"id": 10,
			"text": "wrote",
			"startTime": 5.02,
			"endTime": 5.54
		},
		{
			"id": 11,
			"text": "can",
			"startTime": 5.58,
			"endTime": 5.82
		},
		{
			"id": 12,
			"text": "recognize",
			"startTime": 5.82,
			"endTime": 6.73
		}
		],
		"id": 0,
		"startTime": 0.9,
		"endTime": 6.73
	},
	{
		"line": [
		{
			"id": 13,
			"text": "footage",
			"startTime": 7.54,
			"endTime": 8.02
		},
		{
			"id": 14,
			"text": "coming",
			"startTime": 8.02,
			"endTime": 8.3
		},
		{
			"id": 15,
			"text": "from",
			"startTime": 8.3,
			"endTime": 8.47
		},
		{
			"id": 16,
			"text": "a",
			"startTime": 8.47,
			"endTime": 8.52
		},
		{
			"id": 17,
			"text": "camera",
			"startTime": 8.52,
			"endTime": 9.06
		},
		{
			"id": 18,
			"text": "which",
			"startTime": 9.13,
			"endTime": 9.39
		},
		{
			"id": 19,
			"text": "would",
			"startTime": 9.39,
			"endTime": 9.5
		},
		{
			"id": 20,
			"text": "have",
			"startTime": 9.5,
			"endTime": 9.69
		},
		{
			"id": 21,
			"text": "time",
			"startTime": 9.69,
			"endTime": 9.97
		},
		{
			"id": 22,
			"text": "codes",
			"startTime": 9.97,
			"endTime": 10.51
		}
		],
		"id": 1,
		"startTime": 7.54,
		"endTime": 10.51
	},
	{
		"line": [
		{
			"id": 23,
			"text": "%HESITATION",
			"startTime": 11.07,
			"endTime": 11.35
		},
		{
			"id": 24,
			"text": "that",
			"startTime": 11.35,
			"endTime": 11.52
		},
		{
			"id": 25,
			"text": "are",
			"startTime": 11.52,
			"endTime": 11.71
		},
		{
			"id": 26,
			"text": "offset",
			"startTime": 11.71,
			"endTime": 12.29
		},
		{
			"id": 27,
			"text": "by",
			"startTime": 12.53,
			"endTime": 12.86
		},
		{
			"id": 28,
			"text": "the",
			"startTime": 12.89,
			"endTime": 13.13
		},
		{
			"id": 29,
			"text": "time",
			"startTime": 13.55,
			"endTime": 13.79
		},
		{
			"id": 30,
			"text": "code",
			"startTime": 13.79,
			"endTime": 14.11
		},
		{
			"id": 31,
			"text": "of",
			"startTime": 14.23,
			"endTime": 14.45
		},
		{
			"id": 32,
			"text": "them",
			"startTime": 14.45,
			"endTime": 14.89
		},
		{
			"id": 33,
			"text": "come",
			"startTime": 15.3,
			"endTime": 15.47
		},
		{
			"id": 34,
			"text": "are",
			"startTime": 15.47,
			"endTime": 15.69
		},
		{
			"id": 35,
			"text": "free",
			"startTime": 15.69,
			"endTime": 15.88
		},
		{
			"id": 36,
			"text": "round",
			"startTime": 15.88,
			"endTime": 16.19
		},
		{
			"id": 37,
			"text": "wreck",
			"startTime": 16.19,
			"endTime": 16.4
		},
		{
			"id": 38,
			"text": "run",
			"startTime": 16.4,
			"endTime": 16.59
		},
		{
			"id": 39,
			"text": "all",
			"startTime": 16.59,
			"endTime": 16.71
		},
		{
			"id": 40,
			"text": "that",
			"startTime": 16.71,
			"endTime": 16.85
		},
		{
			"id": 41,
			"text": "kinda",
			"startTime": 16.85,
			"endTime": 17.04
		},
		{
			"id": 42,
			"text": "stuff",
			"startTime": 17.04,
			"endTime": 17.35
		}
		],
		"id": 2,
		"startTime": 11.07,
		"endTime": 17.35
	},
	{
		"line": [
		{
			"id": 43,
			"text": "and",
			"startTime": 17.88,
			"endTime": 18.02
		},
		{
			"id": 44,
			"text": "I",
			"startTime": 18.02,
			"endTime": 18.05
		},
		{
			"id": 45,
			"text": "also",
			"startTime": 18.05,
			"endTime": 18.27
		},
		{
			"id": 46,
			"text": "recognize",
			"startTime": 18.27,
			"endTime": 18.88
		},
		{
			"id": 47,
			"text": "the",
			"startTime": 18.88,
			"endTime": 19.09
		},
		{
			"id": 48,
			"text": "car",
			"startTime": 19.09,
			"endTime": 19.39
		},
		{
			"id": 49,
			"text": "name",
			"startTime": 19.39,
			"endTime": 19.71
		}
		],
		"id": 3,
		"startTime": 17.88,
		"endTime": 19.71
	},
	{
		"line": [
		{
			"id": 50,
			"text": "Rio",
			"startTime": 20.35,
			"endTime": 20.77
		}
		],
		"id": 4,
		"startTime": 20.35,
		"endTime": 20.77
	},
	{
		"line": [
		{
			"id": 51,
			"text": "in",
			"startTime": 21.11,
			"endTime": 21.21
		},
		{
			"id": 52,
			"text": "the",
			"startTime": 21.21,
			"endTime": 21.29
		},
		{
			"id": 53,
			"text": "mid",
			"startTime": 21.29,
			"endTime": 21.43
		},
		{
			"id": 54,
			"text": "to",
			"startTime": 21.43,
			"endTime": 21.51
		},
		{
			"id": 55,
			"text": "late",
			"startTime": 21.51,
			"endTime": 21.79
		}
		],
		"id": 5,
		"startTime": 21.11,
		"endTime": 21.79
	}
	]
}
];

// function transcribe(config, cb){

// 	audioToText(config.audio, function(text){ 
// 		console.log(text);
// 		// console.log(JSON.stringify(text,null, 2));

// 		textToHypertranscript.convert(text, function(hp){
// 			console.log(JSON.stringify(hp,null,2));
			
// 			// var lines = hp;
// 			if(cb){
// 				cb(hp);
// 			}else{
// 				return hp;
// 			}
// 			//////////////////////	
// 			// if(cb){
// 			// 	// if error etc..
// 			// 	cb(testDemo);
// 			// }else{
// 			// 	return testDemo;
// 			// }
// 			//////////////////////
// 		});
// 	});
// }



function  transcribe(config, cb){
	console.log("Flag1")
	console.log(config.audio)

	videoToAudio.convert(config.audio, function(audio_filename){
		console.log("Flag2")
		console.log(audio_filename)

		audioToText(audio_filename, function(text){
			console.log("Flag3")
			console.log(text)

			textToHypertranscript.convert(text, function(hp){
				console.log("Flag4")
				console.log(JSON.stringify(hp,null,2));

  			// var lines = hp;
  			if(cb){
  				cb(hp);
  			}else{
  				return hp;
  			}

		  })
		})
    ////
  })
}




module.exports = transcribe;