//SESSION + JSON
/**
* Takes audio file less then 100mb and sends it to IBM watson to be transcribed.
* Transcription is then saved as a file. and path of that file is returned.
https://www.ibm.com/watson/developercloud/speech-to-text/
*/

//https://github.com/watson-developer-cloud/node-sdk#speech-to-text
var watson = require('watson-developer-cloud');
var fs = require("fs");

//  Initialise var so that scope allows to set api keys
// and use it inside `watsonTranscibe()` function
var speech_to_text;

/**
* takes in json of api keys
* `var keys = {username: "",password: ""}``
*/
// function setAPIkeys(keys){
//   speech_to_text = watson.speech_to_text({
//     username: keys.username,
//     password: keys.password,
//     version: 'v1'
//   });
// }

/**
* takes in autio file path
* returns callback with file path to text file containing transcriptions.
*/
//TODO: pass param of language 
var SendToWatson = function(){}

SendToWatson.prototype.send = function(audioFile,keys, languageModel, cb){
console.log("################# .send_to_watson")
//dictionary that matches language with IBM language  models
// https://www.ibm.com/watson/developercloud/speech-to-text/api/v1/#get_models

/*
languageModel for ib can only be one of these, as string
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
*/

  speech_to_text = watson.speech_to_text({
    username: keys.username,
    password: keys.password,
    version: 'v1'
  });

  var params = {
    audio: fs.createReadStream(audioFile),
    content_type: 'audio/wav',
    //ndicates whether time alignment is returned for each word. The default is false.
    timestamps: true,
    //Indicates whether multiple final results that represent consecutive phrases separated by long pauses are returned. If true, such phrases are returned; if false (the default), recognition ends after the first "end of speech" incident is detected.
    continuous: true,
    //The time in seconds after which, if only silence (no speech) is detected in submit  ted audio, the connection is closed with a 400 response code. The default is 30 seconds. Useful for stopping audio submission from a live microphone when a user simply walks away. Use -1 for infinity.
    inactivity_timeout: -1,
    // Indicates whether a confidence measure in the range of 0 to 1 is returned for each word. The default is false.
    word_confidence: true,
    word_alternatives: 0.9,
    // model_id: 'en-US_BroadbandModel'
    model: languageModel
  };

  speech_to_text.recognize(params, function(err, transcript) {
    if (err)
    console.log(err);
    else
    // console.log(JSON.stringify(transcript, null, 2));
    if(cb){cb(transcript)}else{ return transcript}
  });
}//transcribe

/**
* Helper function to extracts file name from file path string
*/
function getFileName(fileNameWithPath){
  return fileNameWithPath.split("/").pop()
}


module.exports = SendToWatson;

// module.exports.setKeys = setAPIkeys;
