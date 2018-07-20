const getTranscription = require('./index.js');

getTranscription('23f3968e-7014-497e-aeb1-e5418258ba86')
    .then((octoTranscription)=> {
    // console.log(JSON.stringify(json,null,2))
    // do something with output
    // fs.writeFileSync('./example/octo-kaldi.json',JSON.stringify(json,null,2) )
    console.log(octoTranscription);
    // to see if transcription is done check if `words` attribute is not `null`
    // console.log(octoTranscription.retval.words);
});