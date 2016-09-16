/**
* Takes in an audio file, and splits at 5 minutes intervalls.
* NOTE: technically this does not guarantee that each file will be less then 100mb, altho seems to work with no problems is not 100% sure.
* TODO: figure out how to make sure each file does not exceeen 100mb (othwerwise it be rejected by IBM Watson STT service )
*
* takes in file, tmp folder where to put audio files trimmed. and a callback tha returns array with name of files and offest from start, to be able to concact the transcription json from IBM Watson STT Service back togethere as one big file, with word timecodes relative to the original audio/video file times.
  [{
    name: filename,
    offset: 0
  }]
*
*/
var ffmpeg = require('fluent-ffmpeg');

var path = require('path');
var fs = require('fs');

var trimmer = require('./trimmer.js')

  // TODO: refactor this to use ffmpeg-fluent/ffpeg probe 
  // https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#reading-video-metadata
  // var ffmpegBin = "/Users/pietropassarelli/Dropbox/CODE/Vox/TBVE_components/bin/ffmpeg";

//TODO: refactor using config, needs refactroing index.js of sam transcriber if you do
function split(file,tmpFolder, ffmpegBinPath, ffprobeBinPath, cb) {

  var maxLength = 60 * 5;
  var total = 0;
  var files = [];

  // set ffprobe bin 

  if(ffprobeBinPath){
    console.info(ffprobeBinPath)
    console.log(ffprobeBinPath)
  //setting ffmpeg bin
    ffmpeg.setFfprobePath(ffprobeBinPath);
  }else{
    console.warn("ffprobe binary path not defined, so using system one. if available")
  }
  // ffprobe to get  duration 

  ffmpeg.ffprobe(file, function(err, metadata) {
      var duration = metadata.streams[0].duration

      total =  parseInt(duration/maxLength)+1;
    if (duration > maxLength) {

      //trim 
      for(var i =0; i<duration; i+=maxLength){

        var fileName = path.parse(file).base
      
        var filePart = tmpFolder+"/"+ fileName + '.' + i + '.wav';

        trimmer.trim({
          src: file, 
          input: i,
          duration: maxLength,
          outputName: filePart,
          ffmpegBin: ffmpegBinPath,
          callback: function(filePart, i){
            
            finishedSplit(filePart, i);

          }//callback
        })//trimmer

      }//for
    } else {
      cb([{
        name: file,
        offset: 0
      }]);
    }//if else
  });//ffprobe 


function finishedSplit(filename, start) {
  // console.log(start)
    files.push({
      name: filename,
      offset: start
    });

    total--;
    
    if (parseInt(total) === 0) {
      console.log("end of split function")
      // console.log(files)
      cb(files);
    }//if
  }//finishedSplit

};//split 






  module.exports = split;