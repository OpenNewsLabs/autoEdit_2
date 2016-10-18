/**
 * @file Module function that takes in the file path to a media audio or video file and returns a json of transcription. 
 * @author Pietro Passarelli 
 * @requires fs
 * @requires path
 * @requires parseSamJsonToTranscripJson
 * @requires gentle_transcribe
 * @requires convertToWav
 * @requires split
 * @requires SendToWatson
 * @requires parse
 * @requires writeOut
 */ 

var fs                          = require('fs');
var path                        = require('path');

var convertToWav                = require('./convert_to_wav.js');
var split                       = require('./split.js');
var SendToWatson                = require('./send_to_watson.js');
var gentle_transcribe           = require("../gentle_stt_node/index.js");
var parse                       = require('./parse.js');
var writeOut                    = require('./write_out.js');
var parseSamJsonToTranscripJson = require("./sam_transcriber_json_convert.js");

/**
 * @function transcribe
 * Takes in the file path to a media audio or video file and returns a json of transcription.
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
var transcribe = function(config) {

  var file              = config.videoFile;
  var tmpFolder         = config.tmpPath;
  var ffmpegPath        = config.ffmpegBin;
  var ffprobePath       = config.ffprobePath;
  var audioFile         = config.audioFileOutput;
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

  //1.Convert video or audio to audio meeting STT Specs
  convertToWav(file, audioFile, ffmpegPath, function(newFile) {
    // 2. Split audio into 5 min chunks
    split(newFile, tmpFolder, ffmpegPath, ffprobePath, function(files) {
      //reading number of audio files 
      total = files.length;
      // if using IBM STT API
      if ( config.sttEngine == "ibm" ) {
        //3. iterate and send to STT
        files.forEach(function(f) {
          //send each to watson
          var sendToWatsonUtil = new SendToWatson();
          sendToWatsonUtil.send(f.name, config.keys, config.languageModel, function(data) {
            //add offset to json of each audio clippings transcription
            var parsed = parse(data, f.offset);
            //add  json of each audio clippings transcription to out list.
            out.push({ f: f, data: parsed });
            total--;
            // onche there are no more json of audio clippings transcription to parse, returned by the STT API.
            if (total === 0) {
              //4. Output. write out combines json of audio clippings into one json. 
              //parseSamJsonToTranscripJson transform the transcription json from IBM specs to autoEdti2 transcription json specs
              callback( parseSamJsonToTranscripJson( writeOut( out ) ) );
            }
          });
        });
      
      //if chose to use gentle offline for speech to text
      } else if (config.sttEngine =="gentle"){
        //TODO: could refactor to send slipt and then reconnect using gentle. similar to IBM
        //for now sending the entire audiofile.
        //TODO Could send the converted wav file to speed things up. Note that gentle uses ffmpeg to convert media to its specs.
        gentle_transcribe({audio: file} , function(result) {
         
          if(callback) { callback(result); } else { return result; }
        });
      }
    });
  });
};


module.exports = transcribe;
