/**
 * Retrieve a transcription from 
 * 
 * @returns if transcription is not ready 
```
{
  "action": "audio-transcribe",
  "retval": {
    "status": true,
    "wonid": "octo:e9e9c250-75cb-40f0-9c1d-7ef4dd6e05fa",
    "punct": null,
    "words": null
  },
  "elapsed": 0.011369943618774,
  "servertime": "20180720120629.6412"
}
```
 * so to check for the transcription you should not usse `retval.status` as that stands for something else to do with the API
 * bu rather whether the `retval.words` or `retval.punct` are null`. set a timer, and then check again in a bit
 * 
 * if it's available
 * 
 ```
 {
  "action": "audio-transcribe",
  "retval": {
    "status": true,
    "wonid": "octo:e9e9c250-75cb-40f0-9c1d-7ef4dd6e05fa",
    "punct": "What. Yes, yes. Of course. Yes.",
    "words": [
      {
        "start": 0,
        "confidence": 1,
        "end": 0.9,
        "word": "what",
        "punct": "What.",
        "index": 0
      },
        ...
    ]
  },
  "elapsed": 0.012465000152588,
  "servertime": "20180720120752.6328"
}
```
 * 
 */
const fetch = require('node-fetch');
const fs = require('fs');

/**
 * Takes an octoId and returns a promise with the Octo Transcription Json
 * from the BBC News Labs API end point.
 * @param {string} octoId - eg `e2304432-cdbf-4724-9313-8e117b20f506`
 */
function getTranscription(octoId){
    let labsOctoApiGetEndPoint = `http://apis.labs.jupiter.bbc.co.uk/audio-transcribe/${octoId}`;

   return fetch(labsOctoApiGetEndPoint)
        .then(res => res.json())
        .then((json)=> {
            return Promise.resolve(json);
        });   
}

module.exports = getTranscription;


