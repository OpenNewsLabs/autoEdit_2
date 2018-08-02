'use strict';
var path = require('path');
var fromSecondsForSrt = require('../../srt').fromSecondsForSrt;
var fromSeconds =  require('node-timecodes').fromSeconds;
var createSrtContent = require('../../srt').createSrtContent;
var Backbone = require('backbone');
var config = require('../../../config');

// http://backbonejs.org/#Model
module.exports = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: path.join(config.serverUrl, 'transcription'),
  defaults: {
    // title: 'Default Title ',
    // description: 'Default Description',
    // original file path
    // videoUrl: '/',
    // url:'/',
    // sttEngine: 'ibm',
    languageModel: 'en-US_BroadbandModel', // default is american US broadband model
    counterForPaperCuts: 0,
    audioFile: undefined,
    processedAudio: false,
    processedVideo: false,
    // for caption fiel converion
    captionFilePath: "",
    // status is marked as false by default and turned to true when transcription has been processed
    // could changed as status marked as null if there's an issue
    // so that can have 3 options. not set yet, gone wrong, success.
    status: false,
    // to avoid race condition interactive transcription generator
    // https://github.com/OpenNewsLabs/autoEdit_2/issues/53
    metadataStatus: false,
    videoStatus: false,
    transcriptionStatus: false,
    highlights: [],
    // orderedPaperCuts:[],
    videoOgg: undefined,
    // TODO: get date from metadata of video
    metadata: undefined,
    text: undefined,
    // used for error handling when processing transcription
    error: undefined
  },

  // validate
  // http://beletsky.net/2012/11/baby-steps-to-backbonejs-model.html
  //  or
  // https://github.com/thedersen/backbone.validation
  // example https://jsfiddle.net/thedersen/udXL5/
  validate: function(attributes) {
    if (!attributes.title) {
      return 'Remember to set a title for your section.';
      // }else if(!attributes.videoUrl){
      //   return 'Remember to pick a video file';
    }
  },

  // initializer
  initialize: function() {
    // catch error if invalid initialization.

    this.on('invalid', function(model, error) {
      console.info(error);
    });

    this.on('change', function() {
      // console.info('- Values for this model have changed.');
    });

    this.on('change:text', function() {
      // console.log('text value for this model has changed.');
    });
    this.on('destroy', function() {
    });
  }

  // app.TranscriptionsList.get(1).constructor.returnSrtJson()
  // https://stackoverflow.com/questions/9686001/get-a-backbone-model-instances-model-class-name
}, {

  modelType: 'transcription',

  // TODO: change this to returnSrt coz that's what it is doing
  // and make rturns srtJson in helper function in model

  returnSrtContent: function(text, maxNumberOfCharPerLine ) {
    function reorgTranscription(autoEditJsonText){
        var flatArrayOfWords = flatten(autoEditJsonText);
        var wordsInLines =  groupWordsInSrtLines(flatArrayOfWords)
        return wordsInLines;
    }
    
    function flatten(autoEditJsonText,cb){
        let flatArrayOfWords = [];
        autoEditJsonText.forEach((p)=>{
            p.paragraph.forEach((l)=>{
                l.line.forEach((w)=>{
                    flatArrayOfWords.push(w);
                })
            })
        })
        return flatArrayOfWords;
    }
    
    function groupWordsInSrtLines(flatArrayOfWords){
        let charCounter = 0;
        let result = [];
        let tmpLine = [];
         flatArrayOfWords.forEach((word)=>{
            charCounter += word.text.length+1; //+1 because of spaces
            // console.log(charCounter)
            if(charCounter > maxNumberOfCharPerLine ){
                tmpLine.push(word);
                // create new srt line
                let newLine ={
                  startTime: tmpLine[0].startTime, 
                  endTime: tmpLine[tmpLine.length-1].endTime,
                  text: tmpLine.map((w)=>{
                    return w.text
                  }).join(' ')
                }

                console.log(newLine.text, newLine.text.length);
                // 
                result.push(newLine);
                tmpLine = [];
                // console.log('charCounter', charCounter)
                charCounter = 0;
            }
            else{
                tmpLine.push(word);
            }
        })
        return result;
    }

    return createSrtContent(reorgTranscription(text));
  },


  returnPlainTextTimecoded: function(attr) {
    var result;

    function loopThroughStuff(text, cb) {

      var newLinesAr = [];
      var newLine = {};
      var counter = 1;

      _.each(text, function(paragraphs) {
        _.each(paragraphs.paragraph, function(paragraph) {
          newLine.id = counter;
          counter += 1;

          newLine.startTime = fromSecondsForSrt(paragraph.line[0].startTime);
          newLine.endTime = fromSecondsForSrt(paragraph.line[paragraph.line.length - 1].endTime);
          newLine.speaker = paragraphs.speaker;
          newLine.text = '';
          _.each(paragraph.line, function(word) {
            newLine.text += word.text + ' ';
          }); // line
          newLinesAr.push(newLine);
          newLine = {};
        }); // paragraph
      }); // paragraphs

      cb(newLinesAr);
    }


    function createPlainTextTimecoded(srtJsonContent, cb) {
      var lines = '';

      var head = 'Transcription: ' + attr.title + '\n\n';
      head += 'Description: ' + attr.description + '\n\n';
      head += 'File name: ' + attr.metadata.fileName + '\n\n';
      head += 'File path: ' + attr.metadata.filePathName + '\n\n';
      head += 'Reel: ' + attr.metadata.reelName + '\n';
      head += 'Camera Timecode: ' + attr.metadata.timecode + '\n';
      head += 'fps: ' + attr.metadata.fps + '\n';
      head += 'Duration: ' + fromSeconds(attr.metadata.duration) + '\n';
      //
      for (var i = 0; i < srtJsonContent.length; i++) {

        var srtLineO = srtJsonContent[i];
        // lines+=srtLineO.id+'\n';
        lines += '[' + srtLineO.startTime + '\t' + srtLineO.endTime + '\t' + srtLineO.speaker + ']' + '\n';
        // removing IBM hesitation marks if present
        lines += srtLineO.text.replace(/%HESITATION /g, ' ') + '\n\n';
      }

      if (cb) {
        cb(lines);
      } else {
        return head + '\n\n' + lines;
      }
    }

    loopThroughStuff(attr.text, function(res) {
      result = createPlainTextTimecoded(res);
    });


    return result;

  },

  // TODO: returnPlainText and  returnPlainTextTimecoded have a lot of common code, worth optimizing to remove duplciate code.
  returnPlainText: function(attr) {
    var result;

    function loopThroughStuff(text, cb) {

      var newLinesAr = [];
      var newLine = {};
      var counter = 1;

      _.each(text, function(paragraphs) {
        _.each(paragraphs.paragraph, function(paragraph) {
          newLine.id = counter;
          counter += 1;

          newLine.startTime = fromSecondsForSrt(paragraph.line[0].startTime);
          newLine.endTime = fromSecondsForSrt(paragraph.line[paragraph.line.length - 1].endTime);
          newLine.speaker = paragraphs.speaker;
          newLine.text = '';
          _.each(paragraph.line, function(word) {
            newLine.text += word.text + ' ';
          }); // line
          newLinesAr.push(newLine);
          newLine = {};
        }); // paragraph
      }); // paragraphs

      cb(newLinesAr);
    }


    function createPlainTextTimecoded(srtJsonContent, cb) {
      var lines = '';


      var head = 'Transcription: ' + attr.title + '\n\n';
      head += 'Description: ' + attr.description + '\n\n';
      head += 'File name: ' + attr.metadata.fileName + '\n\n';
      head += 'File path: ' + attr.metadata.filePathName + '\n\n';
      head += 'Reel: ' + attr.metadata.reelName + '\n';
      head += 'Camera Timecode: ' + attr.metadata.timecode + '\n';
      head += 'fps: ' + attr.metadata.fps + '\n';
      head += 'Duration: ' + fromSeconds(attr.metadata.duration) + '\n';
      //
      for (var i = 0; i < srtJsonContent.length; i++) {

        var srtLineO = srtJsonContent[i];
        // lines+=srtLineO.id+'\n';
        // lines += '[' + srtLineO.startTime + '\t' + srtLineO.endTime + '\t' + srtLineO.speaker + ']' + '\n';
        //  //removing IBM hesitation marks if present
        lines += srtLineO.text.replace(/%HESITATION /g, ' ') + '\n\n';

      }

      if (cb) {
        cb(lines);
      } else {
        return head + '\n\n' + lines;
      }
    }

    loopThroughStuff(attr.text, function(res) {
      result = createPlainTextTimecoded(res);
    });

    return result;
  },

  // returnEDLSrtJson: function(text) {
  //   return createSrtContent(text);
  // }

});
