# Transcriber module 

 - Takes in the file path to a media audio or video file and returns a json of transcription.
 - converts audio or media file into audio meeting IBM Specs
 - divides audio to send to STT API into 5 min chunks
 - sends all clips all at once 
 	- either to IBM STT API
 	- or Gentle STT API
 - reconnects results as returned by STT API into one json file that meets the autoEdit2 specs
 - returns that as callback 

Originally refactored from Sam Lavine's gist [transcriber.js](https://gist.github.com/antiboredom/9bed969c8b2f89ea4b6c)



## IBM API file size problem/restrictions and current solution
There is a 100mb limit on file size upload for IBM STT

### 1. Reduce the file size.

There's no way to do this
-fs in ffmpeg stops encoding when it reaches the specifies size rather then converting to target file size.

Two pass with bitrate calculation.
Can't figure out how to set this up for audio only.

### 2. Split the file
Split the file in chunks that don't exceed 100mb each and then concat the results.

However as I understand it this is not ideal because Watson STT does machine learning on the whole of the transcription and because of the 100mb limit on sessions these would be treated as separate files, and therefore wit less accuracy compared to the whole video being analysed at once(is this right?)


## Refactoring Sam's transcriber

This module refactor's Sam Lavine's gist [transcriber.js](https://gist.github.com/antiboredom/9bed969c8b2f89ea4b6c) into a more modular components. Removed sox as a dependencies and used ffmpeg instead. and used `fs.statSync` to get file size.

```javascript 
/**
* Helper function to get file size
*/

function getFilesizeInBytes(filename) {
 var stats = fs.statSync(filename)
 var fileSizeInBytes = stats["size"]
 return fileSizeInBytes
}
```


