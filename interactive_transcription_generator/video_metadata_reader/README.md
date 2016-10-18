# Video Metadata Reader

 Read metadata for EDL such as camera timecode, video file name, card name/reel name, fps from a video file, using ffmpeg/ffprobe

 Reads metadata available from video and audio file using ffprobe.

```js
var metadataReader = require('./index.js');

var sampleVideo = "/Users/pietropassarelli/INCOMING_FILES/autoEdit_demo_videos/RecodeLiveEditing_test/Bowman.mov";
//optional link to ffprobe
var exampleFfprobePath = "/Users/pietropassarelli/Dropbox/CODE/Vox/SubtitleBurner_project/SubtitleBurner/bin/ffprobe";

metadataReader.read({
  file: sampleVideo,
  ffprobePath: exampleFfprobePath,
  callback: function(resp){
    console.log(JSON.stringify(resp));
  }
});
```

Given a video it returns a json with metadata info needed for EDL.

```json
{
  "filePathName": "/Users/pietropassarelli/INCOMING_FILES/autoEdit_demo_videos/RecodeLiveEditing_test/Bowman.mov",
  "fileName": "Bowman.mov",
  "date": "2016-02-18 16:38:20",
  "reelName": "time",
  "timecode": "00:01:18:56",
  "fps": "1/60000",
  "duration": 2287.285
}
```


See [./index_example.js](./index_example) for example usage. And example folder for example of output.

Use `readMetadata` to get a json containing all available metadata.

