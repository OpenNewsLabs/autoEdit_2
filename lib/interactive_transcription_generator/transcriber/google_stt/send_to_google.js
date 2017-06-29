'use strict';

const fs = require('fs');
// Imports the Google Cloud client library
// const Speech = require('@google-cloud/speech');

var SendToGoogle = function(){};

SendToGoogle.prototype.send = function(audioFile,keys, languageModel, cb){
// Instantiates a client
const speech = Speech({
  projectId: keys.projectId,
  keyFilename: keys.keyFilename
});

// // The path to the local file on which to perform speech recognition, e.g. /path/to/audio.raw
const filename = audioFile;

// // The encoding of the audio file, e.g. 'LINEAR16'
// // TODO Add to optional config, but default to FLAC
const encoding = 'FLAC';

// // The sample rate of the audio file in hertz, e.g. 16000
// // ADD TO optional config with default
const sampleRateHertz = 16000;

// // The BCP-47 language code to use, e.g. 'en-US'
const languageCode = languageModel ;

const request = {
  encoding: encoding,
  // TODO: sample_rate_hertz (16000) in RecognitionConfig must either be unspecified or match the value in the FLAC header (1600).
  // sampleRateHertz: sampleRateHertz,
  languageCode: languageCode,
  verbose: false
};

// Detects speech in the audio file
speech.recognize(filename, request)
  .then((results) => {
    const transcription = results[0];

    if(cb){cb(null,results)}else{return results};
    //TODO: add callback here 
    // console.log(`Transcription: ${transcription}`);
  })
  .catch((err) => {
    if(cb){cb(err,null)}else{return err};
    // console.error('ERROR:', err);
  });
  
//
// fs.createReadStream(filename)
//   .on('error', console.error)
//   .pipe(speech.createRecognizeStream({
//     config: {
//       encoding: 'LINEAR16',
//       sampleRateHertz: 16000,
//       languageCode: languageModel
//     },
//     singleUtterance: false,
//     interimResults: false
//   }))
//   .on('error', console.error)
//   .on('data', function(data) {
//     console.log("here")
//     console.log(JSON.stringify(data,null,2));
//     // data.results = "how old is the Brooklyn Bridge" 
//   });

};

module.exports = SendToGoogle;
