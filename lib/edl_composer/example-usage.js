
// const EDL = require('edl_composer');
const EDL = require('./index.js');

var edlSq = {
    "title": "Demo Title of project",
    "events":  [
      { "id":1,
        "startTime": 10, // in seconds 
        "endTime": 20,
        "reelName":"SomeReelName",
        "clipName":"Something1.mov",
        "offset": "00:00:28:08", //offset is optional default is "00:00:00:00"
        "fps": 25
      },
      { "id":2,
        "startTime": 45,
        "endTime": 55,
        "reelName":"SomeOtherReelName",
        "clipName":"SomethingElse2.mov",
        "offset": "00:00:28:08",
        "fps": 29.97
      },
        { "id":2,
        "startTime": 45,
        "endTime": 55,
        "reelName":"NA",
        "clipName":"SomethingElse3.mov",
        "offset": "00:00:28:08",
        "fps": 24
      }
    ]
}


var edl = new EDL(edlSq)
console.log(edl.compose())
/*
* returns 

TITLE: Demo Title of project
FCM: NON-DROP FRAME

001   SOMEREE  AA/V  C  00:00:00:00 00:00:00:00 00:00:00:00 00:00:10:00
* FROM CLIP NAME: Something.mov
FINAL CUT PRO REEL: SomeReelName REPLACED BY: SOMEREE

002   SOMEOTH  AA/V  C  00:00:00:00 00:00:00:00 00:00:10:00 00:00:20:00
* FROM CLIP NAME: SomethingElse.mov
FINAL CUT PRO REEL: SomeOtherReelName REPLACED BY: SOMEOTH

002    AX  AA/V  C  00:00:00:00 00:00:00:00 00:00:20:00 00:00:30:00
* FROM CLIP NAME: SomethingElse.mov
*/