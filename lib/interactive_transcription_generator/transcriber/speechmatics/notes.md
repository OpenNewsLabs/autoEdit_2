
 
- [API details](https://app.speechmatics.com/api-details)
- [node module](https://www.npmjs.com/package/speechmatics)
- [List of languages and language codes](https://www.speechmatics.com/language-support/) 

## node module tests

```js
"use strict";
const fs = require("fs");

const Speechmatics = require('speechmatics');
const sm = new Speechmatics(userID, apiToken);

var jobId = "7420708";  

var opts = {};

var existingReadStream = fs.createReadStream("./zero.wav");
```

```js
sm.createJob({audioStream: existingReadStream}, function(error, res){
  console.log(JSON.stringify(res));
  //{"balance":360,"check_wait":null,"cost":0,"id":7420708}
});
```

See below ," Speechmatics transcription data structure " for more details on this.

```json 
{
  "job": {
    "lang": "en-US",
    "user_id": 11173,
    "name": "zero.wav",
    "duration": 0,
    "created_at": "Wed Apr  4 21:49:48 2018",
    "id": 7420708
  },
  "speakers": [],
  "words": [],
  "format": "1.0"
}
```

```js
sm.getTranscript(jobId, opts,callback);
```
```json
 {
  "job": {
    "lang": "en-US",
    "user_id": 11173,
    "name": "zero.wav",
    "duration": 0,
    "created_at": "Wed Apr  4 21:49:48 2018",
    "id": 7420708
  },
  "speakers": [],
  "words": [],
  "format": "1.0"
}
```

```js
sm.getJob(jobId, opts, callback);
```
```json
{
  "check_wait": null,
  "created_at": "Wed, 04 Apr 2018 21:49:48 GMT",
  "duration": 0,
  "id": 7420708,
  "job_status": "done",
  "job_type": "transcription",
  "lang": "en-US",
  "meta": null,
  "name": "zero.wav",
  "next_check": 0,
  "notification": "email",
  "transcription": "zero.json",
  "url": "/v1.0/user/11173/jobs/7420708/audio",
  "user_id": 11173
}
```

>'check_wait': how long (in seconds) Speechmatics advises you should wait before next checking on the status of this job (null if job is finished).

```js
sm.getStatus(opts, callback);
```
```json
{
  "Average_Turnaround_Mins": 2,
  "Known_Issues": false,
  "Queue_Length_Mins": 0,
  "Status": "Good",
  "Time_UTC": "Wed, 04 Apr 2018 22:00:04 GMT"
}
```

```
function callback(error, res){
  console.log(JSON.stringify(res, null, 2));
}
```


----

## Speechmatics transcription data structure 

```js 
sm.getTranscript(jobId, opts,callback);
```

returns

```json
{
  "job": {
    "lang": "ur",
    "user_id": 11173,
    "name": "norman_door_trimmed2.mp4.temp.wav",
    "duration": 4,
    "created_at": "Wed Apr  4 21:45:44 2018",
    "id": 7420669
  },
  "speakers": [
    {
      "duration": "4.34",
      "confidence": null,
      "name": "M1",
      "time": "0.15"
    }
  ],
  "words": [
    {
      "duration": "0.32",
      "confidence": "0.480",
      "name": "کچھ",
      "time": "0.15"
    },
    {
      "duration": "0.33",
      "confidence": "0.480",
      "name": "ان",
      "time": "0.86"
    },
    {
      "duration": "0.55",
      "confidence": "0.480",
      "name": "سے",
      "time": "1.25"
    },
    {
      "duration": "0.33",
      "confidence": "1.000",
      "name": "جو",
      "time": "1.80"
    },
    {
      "duration": "0.29",
      "confidence": "0.910",
      "name": "بنو",
      "time": "2.61"
    },
    {
      "duration": "0.44",
      "confidence": "0.510",
      "name": "منڈوا",
      "time": "2.90"
    },
    {
      "duration": "0.18",
      "confidence": "1.000",
      "name": "اس",
      "time": "3.36"
    },
    {
      "duration": "0.41",
      "confidence": "0.930",
      "name": "وفد",
      "time": "3.55"
    },
    {
      "duration": "0.40",
      "confidence": "0.350",
      "name": "ڈزائن",
      "time": "4.09"
    },
    {
      "duration": "0.00",
      "confidence": "1.000",
      "name": ".",
      "time": "4.49"
    }
  ],
  "format": "1.0"
}
```