
"use strict";
const fs = require("fs");
const createTranscription = require('./newslabs-kaldi-sdk/index.js').createTranscription;
const getTranscription = require('./newslabs-kaldi-sdk/index.js').getTranscription;
const convertBBCJsonToTranscripJson = require('./convert_json.js')

const seconds = 30;
const checkAgainInMilliseconds = seconds *1000;

function makeBBCKaldiTranscription(mediaFilePath, userEmail){

  return createTranscription({
        mediaFilePath: mediaFilePath,
        //TODO need to change this to take param
        userEmail: userEmail
    }).then(checkTranscriptionStatus)
    .then((res)=>{
        console.log('send-to-bbc-res ', res, res.retval, res.retval.words)
        return convertBBCJsonToTranscripJson(res)
        // return(res.retval.words);
    })
};

/**
 * wrapping a timer in a promise to check if the transcription is ready
 * More on this here: https://medium.com/@kornatzky/how-to-integrate-intervals-into-a-promises-chain-in-node-js-9cfe9b19ace7
 */
const checkTranscriptionStatus = (transcriptionJobId) => {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        console.log('inside interval')
        getTranscription(transcriptionJobId)
          .then((data) => {
            //    if (data.retval.words === null) {      
            //    reject(Error('fail'));
            //  } 
             if (data.retval.words !== null) {
                 console.log('data.retval.words', data)
                clearInterval(interval);
                resolve(data)
             }
             // keep on waiting
         });
      }, checkAgainInMilliseconds);
    });
  };


module.exports = makeBBCKaldiTranscription;
// for testing 
// SendToBBC('/Users/passap02/Movies/test_audio.m4a','pietro.passarelli@bbc.co.uk' )

