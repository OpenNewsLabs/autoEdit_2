# WATSON STT - chuncked
from Sam Lavine's gist [transcriber.js](https://gist.github.com/antiboredom/9bed969c8b2f89ea4b6c)


## Problem
There is a 100mb limit on file size upload for IBM STT


### 1. Reduce the file size.

There's no way to do this
-fs in ffmpeg stops encoding when it reaches the specifies size rather then converting to target file size.

Two pass with bitrate calculation.
Can't figure out how to set this up for audio only.

### 2. Split the file
Split the file in chunks that don't exceed 100mb each and then concat the results.

However as I understand it this is not ideal because Watson STT does machine learning on the whole of the transcription and because of the 100mb limit on sessions these would be treated as separate files, and therefore wit less accuracy compared to the whole video being analysed at once(is this right?)

This repo refactor's Sam Lavine's gist [transcriber.js](https://gist.github.com/antiboredom/9bed969c8b2f89ea4b6c) into a more modular components.


## TODO:

- [x] modularise code
- [ ] move tmp audio files in tmp folder
- [ ] remove tmp audio file once received json
- [ ] remove json file once output it's content in callback
- [ ] Keys watson as param
- [ ] ffmpeg bin as param



------
//TODO: refactor convert to Wav with fluent ffmpeg so that can add ffmpeg bin to config json and input


//TODO: run test with Bowman 50gig file to see if ti can handle it.


## Sox
Installing bin binary, permissions are wrong.
```
cd ./sam_transcriber/node_modules/sox-bin
```

```
chmod 700  .
```

```
/Users/pietropassarelli/Dropbox/CODE/Vox/sam_transcriber/node_modules/sox-bin/vendor/osx/sox −−version
```

## calculate size

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
