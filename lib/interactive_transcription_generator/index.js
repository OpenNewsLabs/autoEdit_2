/**
* @module interactive_transcriptionn_generator.
* @description combines transcriber, metadata reader and video webm all into one function. 
* @author Pietro Passarelli 
* @example <caption>Example of usage interactive_transcription_generator </caption> 

var transcription_generate = require("../interactive_transcription_generator/index.js");
transcription_generate({
  //some id, this is more for ease of integrating with yout system
  id: 123,
  //path to audio or video file
  videoUrl: "Some/path/to/a/video/file.mov",
  //where you'd like to hold the temporary clippings needed to do the transcription
  tmpWorkFolder: tmpMediaFolder,
  // where you'd like to output the results
  destFolder: pathToDestFolder,
  //IBM keys for STT service
  keys: {username:"RtycLGgu7istHKoQu6of87nG", pasword: "RtycLGgu7istHKoQu6of87nG"},
  //only for IBM, 
  languageModel: "en-US_BroadbandModel",
  // other option is "gentle"
  sttEngine: "ibm",
  cbMetadata:function(metadata){
      //do someting with the metadata     
  },
  cbTranscription: function(resp){
    //do something with with text of transcription json.
  },
  cbVideo: function(resp){
    //do something with mp4 html5 video preview.  
  }
}

* @example <caption>Example of retunred metadata </caption>
  { 
    filePathName: '/some_file_path/Bowman.mov',
    date: '2016-02-18 16:38:20',
    reelName: 'time',
    timecode: '00:01:18:56',
    fps: '1/60000',
    duration: 2287.285 
  }

* @example <caption>Example of retunred transcription </caption>
  {
    id: id,
    status: true,
    audioFile: "path/to/audio_file.ogg",
    processedAudio: true, 
    videoFile: "path/to/video_dfle.mov",
    text": [
    {
      "id": 0,
      "speaker": "Unnamed Speaker",
      "paragraph": [
        {
          "line": [
            {
              "id": 0,
              "text": "there",
              "startTime": 0.14,
              "endTime": 0.38
            },
            ...
  }

* @example <caption>Example of retunred video webm html5 </caption>
{
  videoOgg: "path/to/video/mp4File.mp4",
  processedVideo: true 
}
* @requires fs 
* @requires path
* @requires transcriber
* @requires video_to_html5
* @requires video_metadata_reader
*/
"use strict";

var path = require("path");
var transcribe = require("./transcriber/index.js");
var convert_video = require("./video_to_html5/index.js");
var MetadataReader = require("./video_metadata_reader/index.js");
var ffmpegPath     = require("../../config.js").ffmpegPath;
var ffprobePath    = require("../../config.js").ffprobePath;

/**
* @function generate
* @description  generates interactive transcription components
* @param {object} config - 
* @param {string} config.videoUrl - 
* @param {string} config.destFolder - 
* @param {string} config.tmpWorkFolder - 
* @param {object} config.keys - 
* @param {string} config.keys.username - 
* @param {string} config.keys.pasword - 
* @param {string} config.languageModel - 
* @param {string} config.sttEngine - 
* @returns {callback} callback - returns object containing transcription and some other attributes, see example output
*/
var generate = function(config) {
  //TODO: this doesn't seem the right way to do it, but changing it breaks the code 

  var videoFile         = config.videoUrl;
  //get video file name without the file path
  var videoFileName     = path.parse(videoFile).base;
  //replace spaces with underscore 
  //TODO: should also sanitse other input that breaks code eg if there is a # in the name of the file. Edge case but can happen as some camera use it in default name of files.eg Sony RX100MKIII
  videoFileName         = videoFileName.replace(/#|>| |<|:|\/|\*|\?|\"|\|/g,"_");
  //Make audio and webm file unique. Eg so that if upload same video twice it gets different audio and video preview.
  //Date.now() returns current time in milliseconds and therefore can be assumed to be unique
  //using timestamp var so that audio and video tile have same time stamp if need to find matching once for same transcription.
  var timeStamp         = Date.now();
  var audioFileName     = path.join(config.destFolder, videoFileName +"."+timeStamp+ ".ogg");
  var videoHtml5OutputPathName = path.join(config.destFolder, videoFileName +"."+timeStamp+ ".mp4");

 // to retrieve Rev media associated with transcription.
  const getRevMedia = require('./transcriber/rev/get-media.js');

  //transcribing file 
  transcribe({
    videoFile: config.videoUrl,
    //Watson IBM API Keys
    keys: config.keys,
    audioFileOutput: audioFileName,
    ffmpegBin: ffmpegPath,
    ffprobePath: ffprobePath,
    // using user file system temp folder as set in index.html
    tmpPath: config.tmpWorkFolder,
    languageModel: config.languageModel,
    sttEngine: config.sttEngine,
    revOrderNumber: config.revOrderNumber,
    // for caption file conversion 
    captionFilePath: config. captionFilePath,

    callback: function(error, respTranscriptJson){
      console.info("---> Done transcribing: "+videoFile, respTranscriptJson);
      console.info("config.videoUrl: "+ config.videoUrl);
      console.log("respTranscriptJson:", respTranscriptJson);
   
      //callback for transcription result
      if(config.cbTranscription){
        if(error){
          config.cbTranscription(error, null);
        }else{
          var transcriptionText = {
            text            : respTranscriptJson,
            audioFile       : audioFileName,
            processedAudio  : true,
            id              : config.id,
            videoFile       : videoFile
          };
          config.cbTranscription(null, transcriptionText);
        }
      }
    } 
  }); 

  // if(config.sttEngine !== 'rev'){
    //reading metadata 
    MetadataReader.read({
      file: videoFile,
      ffprobePath: ffprobePath,

      callback: function(respMetadata){
        console.info("---> read metadata: "+videoFile);
        console.log(respMetadata);
        //callback for metadata result
        if(config.cbMetadata){
          config.cbMetadata(respMetadata);
        }
      }
    });

    // if(isVideoFileMp4(videoFile)){
    //   // if video is already mp4 copy to video preview destination 
    //  // altho there should also be a check for the file size, so not to move huge files into user library
    //  // as well as a check  that it actually is h2.64 codec
    //   // videoHtml5OutputPathName
    //   if(config.cbVideo){
    //     config.cbVideo(output_video_details);
    //   }
    // }
    // else{
        //convert video html5 mp4 
      convert_video({
        src: videoFile,
        outputName: videoHtml5OutputPathName,
        ffmpegBin: ffmpegPath,
        callback: function(outputName){
          console.info("--> converted mp4 video file: "+JSON.stringify(outputName, null, 4));
          //output object 
          var output_video_details  = {
            videoOgg        : outputName,
            processedVideo  : true        
          };
          //callback for video result 
          if(config.cbVideo){
            config.cbVideo(output_video_details);
          }
        }
      });
    // }
    


  // }// config.sttEngine !== rev
  // else if(config.sttEngine === 'rev'){
  //   console.log('rev download video', config);
  //   // Download Video 

  //   getRevMedia({
  //       clientApiKey:  config.keys.rev.username,
  //       userApiKey: config.keys.rev.password,
  //       url: config.keys.rev.url,
  //       orderNumber: config.revOrderNumber,
  //       dest: path.join(config.destFolder, Date.now().toString()+'.mp4')

  //       // TODO: add path to where to save file?
  //     },(outputName)=>{
  //       // TODO: should return path to file
  //       console.info("--> Finished downlaoding rev video mp4 video file: "+JSON.stringify(outputName, null, 4));

  //       var output_video_details  = {
  //         videoOgg        : outputName,
  //         processedVideo  : true        
  //       };

  //        // return callback video available 
  //        if(config.cbVideo){
  //         config.cbVideo(output_video_details);
  //       }

  //       //ReadMetadata on video 
  //       MetadataReader.read({
  //         file: outputName,
  //         ffprobePath: ffprobePath,
    
  //         callback: function(respMetadata){
  //           console.info("---> read metadata: "+outputName);
  //           console.log(respMetadata);
  //           //callback for metadata result
  //           if(config.cbMetadata){
  //             config.cbMetadata(respMetadata);
  //           }
            
  //         }
  //       }); 
  //   });
  // }
};

function isVideoFileMp4(file){
  var extname = path.extname(file);
  if(extname === '.mp4'){
    return true;
  }
  else{
    return false;
  }
}

module.exports = generate;
