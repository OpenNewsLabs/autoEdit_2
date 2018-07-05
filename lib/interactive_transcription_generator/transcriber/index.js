/**
 * @module transcriber
 * @description Module function that takes in the file path to a media audio or video file and returns a json of transcription. 
 * @author Pietro Passarelli 
 * @example
  var path    = require('path');
  var fs      = require('fs');
  var transcriber = require("./index.js");

  var demoFile = "someFilePath.mov";

  //split audio files are kept in tmp folder and then delted
  var tmpFolder = ".";
  var audioFileName = tmpFolder+"/"+path.parse(demoFile).base+".wav";

  //IBM Keys, json with username password attributes.
  var keys = require("path_to_ibm_watson_keys/wttskeys.json")
  //path to ffmpeg and ffprobe pin
  var ffmpegPath = "/path_to_ffmpeg_bin/ffmpeg";
  var ffprobePath = "/path_to_ffmprobe_bin/ffprobe";

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
 * @example <caption>Transcriber example output, an array of lines, containing array of word objects </caption>
   [
     {
      "id": 0,
      "starTime": 0.14,
      "endTime": 4.62,
      "line": 
        [
          {
            "id": 0,
            "text": "there",
            "startTime": 0.14,
            "endTime": 0.38
          },
          ....
        ]
    }
  ]
 * @requires fs
 * @requires path
 * @requires parseSamJsonToTranscripJson
 * @requires gentle_transcribe
 * @requires convertToWav
 * @requires split
 * @requires SendToWatson
 * @requires parse
 * @requires writeOut
 * @tutorial IBM_watson_stt_specs
 */ 

"use strict";

var convertToWav                = require('./convert_to_audio.js');
var split                       = require('./split.js');
var gentle_transcribe           = require("./gentle_stt_node/index.js");
var pocketsphinx_transcribe     = require("./pocketsphinx/index.js");
var SendToWatson                = require('./ibm_stt_node/send_to_watson.js');
var SendToSpeechmatics          = require('./speechmatics/send_to_speechmatics.js');
const getRevTranscriptJson      = require('./rev/index.js');
const convertRevTranscription   = require('./rev/convert-json.js');
var parse                       = require('./ibm_stt_node/parse.js');
var writeOut                    = require('./ibm_stt_node/write_out.js');
var parseSamJsonToTranscripJson = require("./ibm_stt_node/sam_transcriber_json_convert.js");
var convertSpeechmaticsJsonToTranscripJson = require("./speechmatics/convert_json.js");



/**
 * @function transcribe
 * @description Takes in the file path to a media audio or video file and returns a json of transcription.
 * converts audio or media file into audio meeting IBM Specs
 * divides audio to send to STT API into 5 min chunks
 * sends all clips all at once 
 * reconnects results as returned by STT API into one json file that meets the autoEdit2 specs
 * returns that as callback 
 * @param {object} config -  The parameter containting attribute options.
 * @param {string} config.videoFile - path file name to video or audio file to transcribe
 * @param {string} config.tmpPath - path to a temporary folder to put temporary audio files created when dividing audio file into chunks to send to STT API.
 * @param {string} config.ffmpegBin - path to ffmpeg binary. If not present it will try to use system one.
 * @param {string} config.ffprobePath - path to ffprobe binary. If not present it will try to use system one.
 * @param {string} config.audioFileOutput -  path file name for audio file that ISIS created to send to STT API for transcription.
 * @returns {callback} config.callback - Optional callback to return when transcription has done processing. It returns an json object of the transcription.
 */


//TODO: refactor this with promisses?

 var transcribe = function(config) {

  var file              = config.videoFile;
  var tmpFolder         = config.tmpPath;
  var ffmpegPath        = config.ffmpegBin;
  var ffprobePath       = config.ffprobePath;
  var audioFile         = config.audioFileOutput;
  //TODO: pocketsphinx needs a wave and ibm and ogg audio. so doing this patch for now. needs a better solution.
  var  audioFileForPocketsphinx = audioFile.split(".ogg")[0]+".tmp.wav";
  // list of audio clips when audio file chunked to send to IBM STT API in 5 min chunks
  var out               = [];
  //number of audio clips
  var total             = 0;
  //optional callback to return json of transcription 
  var callback;

  //optional callback
  if(config.callback){
    callback = config.callback;
  }

 if (config.sttEngine =="rev"){

  console.log('rev-config', config);

  // download media?

  getRevTranscriptJson({
      clientApiKey: config.keys.rev.username,
      userApiKey:  config.keys.rev.password,
      url: 'https://api-sandbox.rev.com/api/v1/orders',
      orderNumber: config.revOrderNumber
  },function (error, result){
    if(error){
      callback(error, null );
    }else{
    // Some kind of callback error handling?
    // eg try when offline to see what error would be raised?
      console.log('/------------------/');
      console.log('GET TRANSCRIPT JSON:: ',JSON.stringify(result,null,2))
        var autoEditTranscriptJson = convertRevTranscription(result);
        if(callback) { callback(null, autoEditTranscriptJson); } else { return autoEditTranscriptJson; }
    }
  });
  
 }else{

    //1.Convert video or audio to audio meeting STT Specs
    convertToWav(file, audioFile, ffmpegPath, function(newFile) {
      // if using IBM STT API
      if ( config.sttEngine == "ibm" ) {
      // 2. Split audio into 5 min chunks
      split(newFile, tmpFolder, ffmpegPath, ffprobePath, function(files) {
        //reading number of audio files 
        total = files.length; 
          //3. iterate and send to STT
          files.forEach(function(f) {
            //send each to watson
            var sendToWatsonUtil = new SendToWatson();

            sendToWatsonUtil.send(f.name, config.keys.watson, config.languageModel, function(error, data) {
              
              if(error){
              callback(error, null );
            }else{
                  //add offset to json of each audio clippings transcription
                  var parsed = parse(data, f.offset);
                  //add  json of each audio clippings transcription to out list.
                  out.push({ f: f, data: parsed });
                  total--;
                  // onche there are no more json of audio clippings transcription to parse, returned by the STT API.
                  if (total === 0) {
                  //4. Output. write out combines json of audio clippings into one json. 
                  //parseSamJsonToTranscripJson transform the transcription json from IBM specs to autoEdti2 transcription json specs
                  callback(null, parseSamJsonToTranscripJson( writeOut( out ) ) );
                }
              }
            });

          });
        });//split
    
      } else if (config.sttEngine =="speechmatics"){
        console.log("SPEECHMATICS config.sttEngine: ",JSON.stringify(newFile,null,2));

        var SendToSpeechmaticsUtil = new SendToSpeechmatics();
      
          SendToSpeechmaticsUtil.send(newFile, config.keys.speechmatics, config.languageModel, function(error, data) {
              
              if(error){
              callback(error, null );
            }else{
              console.log("SPEECHMATICS-DATA", JSON.stringify(data));

              console.log("SPEECHMATICS-JSON", JSON.stringify(convertSpeechmaticsJsonToTranscripJson(data), null, 2));

              callback(null, convertSpeechmaticsJsonToTranscripJson(data));

                //   //add offset to json of each audio clippings transcription
                //   var parsed = parse(data, f.offset);
                //   //add  json of each audio clippings transcription to out list.
                //   out.push({ f: f, data: parsed });
                //   total--;
                //   // onche there are no more json of audio clippings transcription to parse, returned by the STT API.
                //   if (total === 0) {
                //   //4. Output. write out combines json of audio clippings into one json. 
                //   //parseSamJsonToTranscripJson transform the transcription json from IBM specs to autoEdti2 transcription json specs
                //   callback(null, parseSamJsonToTranscripJson( writeOut( out ) ) );
                // }
              }
            });

        //if chose to use gentle offline for speech to text

      } else if (config.sttEngine =="gentle"){
          //TODO: could refactor to send slipt and then reconnect using gentle. similar to IBM
          //for now sending the entire audiofile.
          //TODO Could send the converted wav file to speed things up. Note that gentle uses ffmpeg to convert media to its specs.
          gentle_transcribe({audio: file} , function(result) {
            if(callback) { callback(null, result); } else { return result; }
          });

        }else if(config.sttEngine == "pocketsphinx"){
          // run pocketsphinx 
          // TODO: need to rethink where convert audio in this flow. perhaps a strategy pattern?
          // coz for instance pocketsphinx needs a different converter for video to audio then IBM.
          pocketsphinx_transcribe({audio: file, audioFile: audioFileForPocketsphinx} , function(result) {
            if(callback) { callback(null, result); } else { return result; }
          });
        //TODO: else if config.sttEngine == "captions"
      

        //srt parser, and return autoEdit json.
        //https://github.com/pietrop/quickQuoteNode/blob/master/lib/interactive_video_components/processing/srt_to_hypertranscript.js#L97
        //Or use srtParserComposer. and convert that json to autoEdit Json. 
        }else if(config.sttEngine =="srt"){
          console.info("YOU HAVE CHOSEN SRT");
        }  
    });
  }// else not Rev 
};


module.exports = transcribe;
