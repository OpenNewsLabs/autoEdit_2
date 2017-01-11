/**
 * @module split
 * @description Takes in an audio file, if it exceeds 5 minutes, it splits at 5 minutes intervalls. 
 * Used by transcriber/index.js module.
 * @author Pietro Passarelli 
 * @todo: technically this does not guarantee that each file will be less then 100mb, altho seems to work with no problems is not 100% sure. 
 * @todo: figure out how to make sure each file does not exceeen 100mb (othwerwise it be rejected by IBM Watson STT service )
 *
 * takes in file, tmp folder where to put audio files trimmed. and a callback tha returns array with name of files and offest from start, to be able to concact the transcription json from IBM Watson STT Service back togethere as one big file, with word timecodes relative to the original audio/video file times.
 * @example <caption>Example usage </caption>

 split(newFile, tmpFolder, ffmpegPath, ffprobePath, function(files) {
    //can do something with array of files
 })
 * @example <caption>Example output `files`</caption>
   [
    {
      name: filename,
      offset: 0
     },
     ...
   ]
 *
 * @example  <caption>Example usage</caption>
  var split = require('./split.js');
  var demoAudio = "audio_example.wav"
  var ffprobePath = "/bin/ffprobe";
  var ffmpegPath = "/bin/ffmpeg";
  var tmpFolder ="./tmp"

   split(demoAudio,tmpFolder,ffmpegPath,ffprobePath, function(files) {
    console.log("done splitting")
    console.log(files)
   })
   
 * @todo refactor to use config object instead of 5 param. Would need updating sam_transcriber/index.js.
 * 
 * @requires fluent-ffmpeg
 * @requires path
 * @requires fs
 * @requires trimmer.js uses costum trimer module to actually cut the clips.
 */

// "use strict";

var path    =  require('path');
var ffmpeg  = require('fluent-ffmpeg');
var trimmer = require('./trimmer.js');

/**
* @function split
* @description splits an audio file, if it exceeds 5 minutes, in 5 minutes intervalls.  
* using `ffprobe` to read duration. `ffmpeg` passed to `trimmer` module.
* saves trimmed clips in temp folder.  
* 
* @todo refactor using config, needs refactroing index.js of sam transcriber if you do
* @param {string} file -  audio file path
* @param {string} tmpFolder - path to a temporary folder to put temporary audio files created when dividing audio file into chunks to send to STT API.
* @param {string} ffmpegBinPath - path to ffmpeg binary. to pass to trimmer module
* @param {string} ffprobeBinPath - path to ffprobe binary. If not present it will try to use system one.
* @param {callback} callback - 
* @returns {callback} callback - returns array of audio clips names with offsts eg [{ name: filename, offset: 0 }]
*/
function split(file, tmpFolder, ffmpegBinPath, ffprobeBinPath, cb) {
  //maximum legth of clips in seconds. 5 minutes each.
  var maxLength = 60 * 5;
  //number of files
  var total = 0;
  //list of files
  var files = [];

  // set ffprobe bin
  if(ffprobeBinPath) {
    ffmpeg.setFfprobePath(ffprobeBinPath);
  } else {
    console.warn("ffprobe binary path not defined, so using system one. if available");
  }

  /**
  * @function finishedSplit
  * @description helper function used as callback to add info on trimmed clips to list of files. 
  * @param {string} - name of the audio clip 
  * @param {number} - clip time offset in seconds, in 5 min intervals
  * @returns {callback} callback - return list of files
  */
  var finishedSplit = function(filename, start) {
    files.push({
      name: filename,
      offset: start
    });
    total--;
    if (parseInt(total) === 0) {
      console.log("end of split function");
      cb(files);
    }
  };

  // ffprobe to get duration
  ffmpeg.ffprobe(file, function(err, metadata) {
    //reads duration of file from metadata
    var duration = metadata.streams[0].duration;
    //divides total audio duration by the maximum length of the trimmed clips to work out in how many instance it needs to be divided
    total = parseInt(duration/maxLength)+1;
    // if click it's longer then 5 minutes
    if (duration > maxLength) {
      //trim audio file into clips 
      for(var i =0; i<duration; i+=maxLength){
        //file name of original audio file
        var fileName = path.parse(file).base;
        //file name for clips 
        var filePart = path.join(tmpFolder, fileName + '.' + i + '.ogg');
        //trim audio files 
        trimmer.trim({
          src: file,
          input: i,
          duration: maxLength,
          outputName: filePart,
          ffmpegBin: ffmpegBinPath,
          //when done trimming add clip to the list through callback. finishedSplit takes in filename and start
          callback: finishedSplit
        });

      }
    } else {
      //if the audio file is less then 5 minutes then it returns a list with one element. to keep the interface.
      cb([{
        name: file,
        offset: 0
      }]);
    }
  });
}

module.exports = split;
