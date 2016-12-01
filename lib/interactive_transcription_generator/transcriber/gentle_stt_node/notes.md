# Implementation Notes

## Context

Meant to be be used with text based video editing tool, in alternative to IBM Watson speech to text. (separate project)

[Text Based video editing  - demo ](https://db.tt/BNedAjt2)

- click  `New` 
- then back to `Transcriptions`
- then the first transcription you see `Jesselyn Radack`
- you can try to select some text in whatever order you want
- and click `Export`.

## Implementation notes

### Module that does the post request
1.download DMG from gentle, and run local host version of app 
https://lowerquality.com/gentle/

Download version 0.9.1 
https://github.com/lowerquality/gentle/releases/tag/0.9.1 

 
2. make post request with audio using curl from terminal  (to test that it actually works)

```
curl -F "audio=@audio.mp3"  "http://localhost:8765/transcriptions?async=false"
```

for alligning thext, which is original intended use then call would be, specifiying transcription file containing plain text. 

```
curl -F "audio=@audio.mp3" -F "transcript=@words.txt" "http://localhost:8765/transcriptions?async=false"
```


3. make post request in node (or first in python if that's easier)


Example post request for watson

```javascript 
var request = require('request');
var fs = require('fs');

var url = 'https://stream.watsonplatform.net/speech-to-text/api/v1/recognize';

function send_to_watson(file,keys, callback) {
console.log("################# .send_to_watson")
  fs.readFile(file, function(error, data) {
    if (error) {
      console.log(error);
      return false;
    }

    var options = {
      headers: {
        'Content-Type': 'audio/wav',
        'Transfer-Encoding': 'chunked',
      },
      qs: {
        timestamps: 'true',
        continuous: 'true',
        inactivity_timeout: '-1'
      },
      auth: {
        user: keys.username,
        pass: keys.password
      },
      body: data
    };

    request.post(url, options, function(error, response, body) {
      if (error) console.log(error);

      // var parsed = parse(JSON.parse(body));
      if (typeof callback !== 'undefined') {
            // fs.writeFileSync("./tmp/tmp.watson.tramscription.json",JSON.stringify(JSON.parse(body) ))
        callback(JSON.parse(body));
      }
    });
  });
}

module.exports = send_to_watson;
```

example usage

```
var watsonTranscribe = require("./send_to_watson.js");

var demo_audio  ="/Users/pietropassarelli/Desktop/nwjs_transcription_rnd/transcriber/tmp/audio/norman_door_trimmed2.mp4.tmp.wav";

var keys = require("/Users/pietropassarelli/Dropbox/CODE/Vox/TBVE/Lotus_v9/wttskeys.json")
// var keys = {
//   username: '',
//   password: '',
// }
// watsonTranscribe.setKeys(keys)

watsonTranscribe(demo_audio, keys,function(watsonSttJson){
  // console.log("finished!!!!")
  console.log(JSON.stringify(watsonSttJson))
})

```

### Json response -> parsed to transcription specs 

example  JSON returned by Gentle
https://lowerquality.com/gentle/align.json


specs of Interactive transcription used by the system 

```
[
        {
          "id": 0,
          "speaker": "Unamed Speaker 1",
          "paragraph": [
            {
              "line": [
                {
                  "id": 0,
                  "text": "good",
                  "startTime": 0.1,
                  "endTime": 0.29
                },
                ...
```



