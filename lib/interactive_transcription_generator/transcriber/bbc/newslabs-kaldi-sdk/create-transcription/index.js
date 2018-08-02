/**
 * 
 * 
 * @returns
 
```json
{ action: 'audio-transcribe',
  retval:
   { success: true,
     audiobytes: 89022,
     filename: '',
     jobid: 'e279b573-74a6-43db-a5c4-f2be893725c4',
     transcript: 'http://apis.labs.jupiter.bbc.co.uk/audio-transcribe/e279b573-74a6-43db-a5c4-f2be893725c4' },
  elapsed: 0.13762903213501,
  servertime: '20180720095813.0134' }
```
 */
const fs = require('fs');
const path = require("path");
const fetch = require('node-fetch');

const bbcNewsLabsSTTApiEndPoint = 'http:/apis.labs.jupiter.bbc.co.uk/audio-transcribe';

/**
 * creates the url for the request
 * @param {*} email - BBC user email address, user receives an email notification when transcription done processing
 * @param {*} fileName - file name of the media file (just name no path)
 * @returns {string} - returns `http:/apis.labs.jupiter.bbc.co.uk/audio-transcribe?email=${email}&${fileName}`
 */
function buildPostUrl(email,fileNamePath){
    let fileName = path.basename(fileNamePath);
    // url parameters need to be constructed using URL to avoid `TypeError: Only absolute URLs are supported`
    // see https://github.com/github/fetch/issues/256 &  https://fetch.spec.whatwg.org/#fetch-api
    let url = new URL(bbcNewsLabsSTTApiEndPoint);
    url.searchParams.append('email', email)
    url.searchParams.append('fileName',fileName)
    return url;
}

/**
 * 
 * @param {object} optionsArgs 
 * @param {string} optionsArgs.userEmail - user mail address
 * @param {string} optionsArgs.mediaFilePath - path to the media file 
 */
function createTranscription(optionsArgs){

  return fetch(buildPostUrl(optionsArgs.userEmail, optionsArgs.mediaFilePath), { method: 'POST', body: fs.readFileSync(optionsArgs.mediaFilePath) })
        .then(res => res.json())
        .then((json) =>{
            // console.log('inside createTranscription', json);
            return json.retval.jobid;
        })
}

module.exports = createTranscription;
