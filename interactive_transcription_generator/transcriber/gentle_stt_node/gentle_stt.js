/**
* @module send_to_gentle
* @description gentle stt SDK
* @example <caption>Example usage - transcribe audio</caption>

var send_to_gentle = require("./gentle_stt.js");
var demo_audio  ="demo_audio.wav";
send_to_gentle({audio: demo_audio},function(watsonSttJson){
  console.log(JSON.stringify(watsonSttJson, null, '\t'))
})
* @example <caption>Example usage - aligning text to audio</caption>

var send_to_gentle = require("./gentle_stt.js");
var demo_audio  ="demo_audio.wav";
var demo_text = "./demo.txt"
send_to_gentle({audio: demo_audio, text: demo_text},function(watsonSttJson){
  console.log(JSON.stringify(watsonSttJson, null, '\t'))
})
*/

"use strict";

var fs = require('fs');
var request = require('request');

/**
* @function send_to_gentle
* Takes in file with absolute path. can use node module path to get absolute path of a file.
*/
function send_to_gentle(config, callback) {
  //TODO: issue is that when gentle app load, the port by default is 8675, but this is not reliable so it could be a different one sometimes making the request void.
  var url = "http://localhost:8765/transcriptions?async=false";
  var file = config.audio;
  var text;
  //text is optional so this could be undefined if not set
  if(typeof config.text !== 'undefined'){
    text  = config.text;
  }
  //Sending request to Gentle STT")
  var options = {
    headers: {
      'Content-Type': 'multipart'
    },
    formData: {
      audio: fs.createReadStream(file)
    }
  };
  //if there is a text attribute adding it to the form data 
  if(typeof text !== 'undefined'){
    options.formData.transcript = fs.createReadStream(text);
  }
  //sends request to gentle stt api service
  request.post(url, options, function(error, response, body) {
    if (error) console.log(error);   
    if (typeof callback !== 'undefined') {
      callback(JSON.parse(body));
    }
  });
}

module.exports = send_to_gentle;
