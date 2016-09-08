/**
* Example usage
* Desided to leave the naming of the output file out of the module to make it less opiononated.
*/

var webmConverter = require('./index.js')
var sampleVideo = "/Users/pietropassarelli/Desktop/record_elon.mp4";

// var recodeSampleVideo = "/Users/pietropassarelli/INCOMING_FILES/autoEdit_demo_videos/RecodeLiveEditing_test/Bowman.mov";

var path = require('path');
var pathO = path.parse(sampleVideo)
//get file name
var fileName = pathO.base;
//if you want same folder as origin
// var fileFolder = pathO.dir;

var sampleOutputFileName = "./"+fileName+".webm";

var exampleFfmpegPath = "/Users/pietropassarelli/Dropbox/CODE/Vox/TBVE_components/bin/ffmpeg";

configEx = {};

configEx.src = sampleVideo;
configEx.outputName = sampleOutputFileName;
configEx.ffmpegBin = exampleFfmpegPath;

configEx.callback = function(o){
  console.log("Done exporting: "+o)
};

webmConverter.convert(configEx);


// //TODO check if this works
// webmConverter.convert({
//   src: sampleVideo,
//   outputName: sampleOutputFileName,
//   ffmpegBin: exampleFfmpegPath,
//   callback: function(outputName){
//     console.log("Done exporting: "+outputName)
//   }
//
// })
//or without callback
// webmConverter.convertToWebm(sampleVideo, './tmp/'+fileName+'.ogg');
