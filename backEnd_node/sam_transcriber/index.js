
var path = require('path');
var fs = require('fs');

var parseSamJsonToTranscripJson = require("./sam_transcriber_json_convert.js");

// index_example.js

var  gentle_transcribe =  require("../gentle_stt_node/index.js")



var convertToWav = require('./convert_to_wav.js');
var split = require('./split.js');
var SendToWatson = require('./send_to_watson.js');
var parse = require('./parse.js');
var writeOut = require('./write_out.js')


var Transcriber = function (){};

 Transcriber.prototype.transcribe = function(config) {
  // var startTime = new Date();
  // console.log(startTime);
  // console.log("########### sam transcriber")
  var file = config.videoFile;
  var tmpFolder = config.tmpPath;

  var exampleFfmpegPath = config.ffmpegBin;
  //TOD add in controller
    var ffprobePath = config.ffprobePath;

  // var fileName = path.parse(file).base
  // var aud_file = tmpFolder+"/"+fileName + '.temp.wav';
  var aud_file = config.audioFileOutput;

  // var jsonFile = tmpFolder+"/"+path.parse(file).base + ".transciption.json";

  if(config.callback){
    //optional callback
    callback = config.callback;
  }

  var out = [];
  var total = 0;
  //1.Convert video to audio
  convertToWav(file,aud_file, exampleFfmpegPath,function(newFile) {
    // console.log("1/###########  convertToWav")
    // console.log("#newFile")
    // console.log(newFile)
    // 2. Split
    split(newFile,tmpFolder, exampleFfmpegPath, ffprobePath,function(files) {
      // console.log("2/########### split")
      // console.log("#files")
      // console.log(files)
      total = files.length;

        if(config.sttEngine == "ibm"){


      //3. iterate and send to STT

      files.forEach(function(f) {
        //if chose to use ibm for speech to text
      
            console.info("#f")
          console.log(f)
          console.log(config)
          //send each to watson
          //TODO: add model/language in argument
          var sendToWatsonUtil = new SendToWatson();
          sendToWatsonUtil.send(f.name, config.keys, config.languageModel, function(data) {
                  // console.log("3/########### send_to_watson")
            //Parse data and add offset
            // console.log(JSON.stringify(data))
            var parsed = parse(data, f.offset);
              // console.log("4/########### parsed")
              // console.log(JSON.stringify(parsed))
            //NOTE:output data after offset, cb for interim results should go here
            // console.log(JSON.stringify(parsed))
            out.push({
              f: f,
              data: parsed
            });
            total--;
            if (total === 0) {
              //4. Output
      
              writeOut( out, function(watsonSttJson){
                //convert Watson json to System specs transcription json
                parseSamJsonToTranscripJson(watsonSttJson, function(transcriptJson){
                
                  //TO PRINT OUT TRANSCRIPTION
                    // console.log(JSON.stringify(transcriptJson, null, "\t"))

                    // fs.writeFileSync("/"+config.videoFile+".json",JSON.stringify(transcriptJson, null, "\t"))
                    
                    if(callback){callback(transcriptJson)}else{return transcriptJson};
                })//parseIBMsttToTranscripJson

              });
              //clean up
                //delete `files`
                //delete newFile
                // fs.unlink(aud_file);
                //delete json
            }
          });
      });//file for each 
          //if chose to use gentle offline for speech to text
        }else if(config.sttEngine =="gentle"){
          //TODO: could refactor to send slipt and then reconnect using gentle.
          //for now sending the entire file
          gentle_transcribe(file, function(result) {
           console.log(JSON.stringify(result, null, "\t"))

              if(callback){callback(result)}else{return result};

          })//gentle transcribe

        }//else if ibm gentle 

    });
  });
}

// var file = process.argv[2];

// transcribe(file);

module.exports = Transcriber;
