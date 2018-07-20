// Creating a transcription
const createTranscription = require('./index.js').createTranscription;

var mediaFilePath = '/Users/passap02/Movies/test_audio.m4a';

createTranscription({
    mediaFilePath: mediaFilePath,
    userEmail: 'pietro.passarelli@bbc.co.uk'
});

// Getting a transcription

const getTranscription = require('./index.js').getTranscription;

getTranscription('e9e9c250-75cb-40f0-9c1d-7ef4dd6e05fa')
    .then((octoTranscription)=> {
    // Do something with resulting transcription
    // fs.writeFileSync('./example/octo-kaldi.json',JSON.stringify(json,null,2) )
    console.log(JSON.stringify(octoTranscription,null,2));
});
