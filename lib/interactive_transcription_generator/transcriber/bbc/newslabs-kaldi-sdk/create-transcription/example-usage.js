const createTranscription = require('./index.js');

var mediaFilePath = '/Users/passap02/Music/sample-audio.m4a';

 createTranscription({
    mediaFilePath: mediaFilePath,
    userEmail: 'pietro.passarelli@bbc.co.uk'
});


// transcriptionResult.then((res)=>{
//     console.log('inside usage: ', res);
// }).catch((error)=>{
//     console.log('inside usage error: ',error);
// })