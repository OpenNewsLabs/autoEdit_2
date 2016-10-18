var path    = require('path');
var fs      = require('fs');
var transcriber = require("./index.js");

var demoFile = "/Users/pietropassarelli/Dropbox/PremiereProjects/AA0002_1.mov";

//split audio files are kept in tmp folder and then delted
var tmpFolder = ".";
var audioFileName = tmpFolder+"/"+path.parse(demoFile).base+".wav";

//IBM Keys
var keys = require("/Users/pietropassarelli/Dropbox/CODE/Vox/TBVE_components/keys/wttskeys.json")
var ffmpegPath = "/Users/pietropassarelli/Dropbox/CODE/Vox/TBVE/nwjs_backbone_sails_transcription/backEnd/api/services/bin/ffmpeg";
var ffprobePath = "/Users/pietropassarelli/Dropbox/CODE/Vox/SubtitleBurner_project/SubtitleBurner/bin/ffprobe";


transcriber({
  videoFile: demoFile,
  keys:keys,
  audioFileOutput: audioFileName,
  ffmpegBin: ffmpegPath,
  tmpPath: tmpFolder,
  ffprobePath: ffprobePath,
  callback: function(respTranscriptJson){

    console.log(JSON.stringify(respTranscriptJson,null,2));

    fs.writeFileSync("./example_tramscription.json",JSON.stringify(respTranscriptJson ))

    //optionally if you don't need to keep the audio file used to send to IBM Watson, here is a good place/time to delete it.
    //eg deleting audio file used for transcription
    // fs.unlinkSync(audioFileName);

    //However if you need, the audio file for instance to do speaker diarization with another system that requries same audio, here's a good place to save the file name/file path for reference.

  }
})