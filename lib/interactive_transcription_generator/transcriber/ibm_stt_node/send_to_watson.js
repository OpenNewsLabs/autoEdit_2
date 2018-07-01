/**
* @module SendToWatson
* @description node SDK to connect to IMB Watson API STT Service
* @description Takes audio file less then 100mb and sends it to IBM watson to be transcribed.
* Transcription is then saved as a file. and path of that file is returned.
* [Node SDK speech-to-text]{@link https://github.com/watson-developer-cloud/node-sdk#speech-to-text}
* [IBM speech-to-text]{@link https://www.ibm.com/watson/developercloud/speech-to-text}
* [IBM STT API reference]{@link https://www.ibm.com/watson/developercloud/speech-to-text/api/v1/#get_models}
*
* @example <caption>Example usage </caption>

  var audioFile = "audio_sample.wav";
  var keys = { username: "youtwatson stt keys", password:"you watson stt service pswd"};
  languageModel = "en-US_BroadbandModel";

  var sendToWatsonUtil = new SendToWatson();
  sendToWatsonUtil.send(audioFile, keys, languageModel, function(data) {
    //data is a IBM JSON transcription  
  })
* @requires fs
* @requires watson-developer-cloud
* @tutorial IBM_watson_stt_specs
*/

"use strict";

var fs = require("fs");
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');

//  Initialise var so that scope allows to set api keys
//TODO: not sure if this i needed
var speech_to_text;

/**
* @constructs SendToWatson
* @description API Object to work with Watson STT APIk
*/
var SendToWatson = function(){};

/**
* @function SendToWatson.send
* @description send audio file to IBM STT API and get json transcription  back 
* @param {string} audioFile - file path to audio file to transcribe 
* @param {string} keys - json object with `username` and `password` for IBM STT Service as set by Bluemix
* @param {string} keys.username - username for IBM STT service
* @param {string} keys.pasword - password for IBM STT service
* @params {string} languageModel - one of the supported languages by IBM STT Services
* @returns {callback} - returns callback with file path to text file containing transcriptions.
@example <caption>IBM supported languages </caption>
// dictionary that matches language with IBM language  models
ar-AR_BroadbandModel
en-UK_BroadbandModel
en-UK_NarrowbandModel
en-US_BroadbandModel
en-US_NarrowbandModel
es-ES_BroadbandModel
es-ES_NarrowbandModel
fr-FR_BroadbandModel
ja-JP_BroadbandModel
ja-JP_NarrowbandModel
pt-BR_BroadbandModel
pt-BR_NarrowbandModel
zh-CN_BroadbandModel
zh-CN_NarrowbandModel
ko-KR_BroadbandModel
ko-KR_NarrowbandModel
*/
SendToWatson.prototype.send = function(audioFile,keys, languageModel, cb){

  //credentials for STT API 

  const stt_config = {
    username: keys.username,
    password : keys.password
  };

  // If the username is 'apikey', we're using a newer Watson STT instance, so we'll add the iam_apikey property and set an instance
  // endpoint URL if there is one.
  if(keys.username === 'apikey'){
    stt_config.iam_apikey = keys.password;
    stt_config.url = keys.url;
  }

  var speech_to_text = new SpeechToTextV1( stt_config );

  //params to send to IBM STT API request
  var params = {
    audio: fs.createReadStream(audioFile),
    content_type: 'audio/ogg',
    //indicates whether time alignment is returned for each word. The default is false.
    timestamps: true,
    //Indicates whether multiple final results that represent consecutive phrases separated by long pauses are returned. If true, such phrases are returned; if false (the default), recognition ends after the first "end of speech" incident is detected.
    continuous: true,
    //The time in seconds after which, if only silence (no speech) is detected in submit  ted audio, the connection is closed with a 400 response code. The default is 30 seconds. Useful for stopping audio submission from a live microphone when a user simply walks away. Use -1 for infinity.
    inactivity_timeout: -1,
    // Indicates whether a confidence measure in the range of 0 to 1 is returned for each word. The default is false.
    word_confidence: true,
    word_alternatives: 0.9,
    //turning of profinity filter which is set to true by default and only works for US english.
    profanity_filter: false,
    model: languageModel
    //TODO: add speaker diarization option
  };

  //makes request to STT API 
  speech_to_text.recognize(params, function(err, transcript) {
    if (err){
    console.error(err);
       if(cb){
        cb(err, null);
      }else{ 
        return err;
      }
    }else{
      if(cb){
        cb(null, transcript);
      }else{ 
        return transcript;
      }
    }
  });
}

module.exports = SendToWatson;