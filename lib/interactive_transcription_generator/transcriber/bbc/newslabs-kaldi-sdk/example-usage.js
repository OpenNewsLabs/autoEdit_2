// Creating a transcription
const createTranscription = require('./index.js').createTranscription;

// // var mediaFilePath = '/Users/passap02/Movies/test_audio.m4a';
// var mediaFilePath = '/Users/passap02/Library/Application\ Support/autoEdit2/media/MOORBODY_IHA_LDN_1830_26_1-h264.mp4.1535648014706.ogg';

// createTranscription({
//     mediaFilePath: mediaFilePath,
//     userEmail: 'pietro.passarelli@bbc.co.uk'
// }).then((res)=>{
//     console.log(res);
// }).catch((error)=>{
//     console.log('inside usage error: ',error);
// })

// Getting a transcription

const getTranscription = require('./index.js').getTranscription;
// var id = 'e9e9c250-75cb-40f0-9c1d-7ef4dd6e05fa';
var id = '1473605b-150d-44b0-98d8-a9a103feae5e';

getTranscription(id)

    .then((octoTranscription)=> {
    // Do something with resulting transcription
    // fs.writeFileSync('./example/octo-kaldi.json',JSON.stringify(json,null,2) )
    console.log(JSON.stringify(octoTranscription,null,2));
});
