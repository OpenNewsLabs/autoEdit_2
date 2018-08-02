const createTranscription = require('./index.js');

var mediaFilePath = '/Users/passap02/Music/sample-audio.m4a';

 createTranscription({
        mediaFilePath: mediaFilePath,
        userEmail: 'pietro.passarelli@bbc.co.uk'
    }).then((res)=>{
        console.log(res);
    }).catch((error)=>{
        console.log('inside usage error: ',error);
    })