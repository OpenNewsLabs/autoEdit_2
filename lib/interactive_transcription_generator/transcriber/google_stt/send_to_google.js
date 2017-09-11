'use strict';

const Speech = require('gcloud_speech_electron');

var SendToGoogle = function(){};

SendToGoogle.prototype.send = function(audioFile,keys, languageModel, cb){

  const APIKEY = keys.apiKey;
  console.log("APIKEY",APIKEY);

  var configSTT = {
      "encoding": 'FLAC',
      "sampleRateHertz": 16000,
      // for supported languages see https://cloud.google.com/speech/docs/languages
      "languageCode": languageModel,
      "maxAlternatives": 1,
      "profanityFilter": false,
      "enableWordTimeOffsets": true
  };


  var client = new Speech(APIKEY);

  client.recognize(audioFile,configSTT, function(error, response){
    if(error){
      console.error("There has been an error");
      //console.error(JSON.stringify(error.error.message, null, 2));
      // Do something with the Error
      console.error(JSON.stringify(error,null,2));

      if(cb){cb(error,null);}else{return error;}

    }else{
      if(response == null){
        console.log(response);
        console.error(error);
      }
      // Do something with the results
      // console.log("error: ",JSON.stringify(response,null,2));
      console.log("response: ",JSON.stringify(response,null,2));

      if(cb){cb(null,response);}else{return response;}
    }
  });

};

module.exports = SendToGoogle;
