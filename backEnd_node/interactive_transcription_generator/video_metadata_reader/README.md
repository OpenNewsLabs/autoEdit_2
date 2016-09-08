# Video Metadata Reader


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

See [./index_example.js](./index_example) for example usage.


## Test

Test run with jasmine. 

```
npm test
```
