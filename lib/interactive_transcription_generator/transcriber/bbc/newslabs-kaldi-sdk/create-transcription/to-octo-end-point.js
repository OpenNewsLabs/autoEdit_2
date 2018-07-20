/**
 * Not in use, kept as reference if need to connect directly to Octo API end point
 * eg for troubleshooting 
 * @returns
 * `{"id":"184863d3-5155-4e1a-8c29-dec9cb0b3e0a"}`
 */
const fs = require('fs');
const fetch = require('node-fetch');
const FormData =require('form-data');

const octoApiPostEndPoint = 'http://octo.labs.jupiter.bbc.co.uk:8085/octocts/v1/uploads';

function createTranscription(optionsArgs){

        const form = new FormData();
        form.append('userEmail', optionsArgs.userEmail);
        form.append('filename', optionsArgs.fileName);
        form.append('file', fs.readFileSync(optionsArgs.mediaFilePath),  {
            filename: optionsArgs.fileName,
            filepath: optionsArgs.mediaFilePath
          });
 
        fetch(octoApiPostEndPoint, { method: 'POST', body: form, headers: form.getHeaders() })
            .then(res => res.json())
            .then(json => console.log(json));
}

// module.exports = createTranscription;
var mediaFilePath = '/Users/passap02/Music/sample-audio.m4a';

createTranscription({
    mediaFilePath: mediaFilePath,
    fileName: 'sample-audio',
    userEmail: 'pietro.passarelli@bbc.co.uk'
});