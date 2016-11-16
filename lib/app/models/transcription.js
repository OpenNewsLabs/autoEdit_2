'use strict';
var fromSecondsForSrt = require('../../srt').fromSecondsForSrt;
var createSrtContent = require('../../srt').createSrtContent;
var Backbone = require('backbone');
var config = require('../../../config');

// http://backbonejs.org/#Model
module.exports = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: config.serverUrl + '/transcription',
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
    status: false,
    highlights: [],
    // orderedPaperCuts:[],
    videoOgg: undefined,
    metadata: undefined,
    text: undefined

    // status is marked as false by default and turned to true when transcription has been processed
    // get date from metadata of video
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
    // console.log('This model has been initialized.');
    // this.id = this._id;

    this.on('invalid', function(model, error) {
      console.info(error);
    });

    this.on('change', function() {
      // console.info('- Values for this model have changed.');
    });

    this.on('change:text', function() {
      console.log('text value for this model has changed.');
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

  returnSrtContent: function(text) {
    var result;
    // helper function to split array in equal parts
    // from http://stackoverflow.com/questions/8188548/splitting-a-js-array-into-n-arrays
    function split(arr, n) {
      var res = [];
      while (arr.length) {
        res.push(arr.splice(0, n));
      }
      return res;
    }

    function loopThroughStuff(text, cb) {
      // var text = app.TranscriptionsList.get(8).get('text');
      var newLinesAr = [];
      var newLine = {};
      var counter = 1;
      text.forEach(function(paragraphs) {
        paragraphs.paragraph.forEach(function(paragraph) {
          if (paragraph.line.length > 8) {
            // console.log(JSON.stringify(paragraph));
            // console.log(JSON.stringify(paragraph.line.length));
            // console.log('---');
            var regroupLines = split(paragraph.line, 8);
            // console.log(regroupLines);
            // make srt lines
            regroupLines.forEach(function(l) {
              console.log(JSON.stringify(l));
              console.log('---');
              newLine.id = counter;
              counter += 1;
              newLine.startTime = fromSecondsForSrt(l[0].startTime);
              newLine.endTime = fromSecondsForSrt(l[l.length - 1].endTime);
              newLine.text = '';
              l.forEach(function(w) {
                // console.log('---');
                // console.log(JSON.stringify(w));
                newLine.text += w.text + ' ';
              }); // words
              newLinesAr.push(newLine);
              newLine = {};
            }); // lines in regrouped lines
          } else {
            newLine.id = counter;
            counter += 1;
            newLine.startTime = fromSecondsForSrt(paragraph.line[0].startTime);
            newLine.endTime = fromSecondsForSrt(paragraph.line[paragraph.line.length - 1].endTime);
            newLine.text = '';
            paragraph.line.forEach(function(word) {
              // console.log(word)
              newLine.text += word.text + ' ';
            }); // line
            newLinesAr.push(newLine);
            newLine = {};
          }
        }); // paragraph
      }); // paragraphs
      cb(newLinesAr);
    }

    loopThroughStuff(text, function(res) {
      result = createSrtContent(res);
    });

    return result;
  },


  returnPlainTextTimecoded: function(attr) {
    console.log(attr)

    function loopThroughStuff(text, cb) {

      var newLinesAr = []
      var newLine = {}
      var counter = 1

      _.each(text, function(paragraphs) {
          _.each(paragraphs.paragraph, function(paragraph) {
              newLine.id = counter;
              counter += 1

              newLine.startTime = fromSecondsForSrt(paragraph.line[0].startTime)
              newLine.endTime = fromSecondsForSrt(paragraph.line[paragraph.line.length - 1].endTime)
              newLine.speaker = paragraphs.speaker;
              newLine.text = ''
              _.each(paragraph.line, function(word) {
                  // console.log(word)
                  newLine.text += word.text + ' '
                }) //line
              newLinesAr.push(newLine)
              newLine = {}
            }) //paragraph
        }) //paragraphs

      cb(newLinesAr)
    }


    function createPlainTextTimecoded(srtJsonContent, cb) {
      var lines = '';

      var head = 'Transcription: ' + attr.title + '\n\n'
      head += 'Description: ' + attr.description + '\n\n'
      head += 'File name: ' + attr.metadata.fileName + '\n\n'
      head += 'File path: ' + attr.metadata.filePathName + '\n\n'
      head += 'Reel: ' + attr.metadata.reelName + '\n'
      head += 'Camera Timecode: ' + attr.metadata.timecode + '\n'
      head += 'fps: ' + attr.metadata.fps + '\n'
      head += 'Duration: ' + fromSeconds(attr.metadata.duration) + '\n'
        // 
      for (var i = 0; i < srtJsonContent.length; i++) {

        srtLineO = srtJsonContent[i];
        // lines+=srtLineO.id+'\n';
        lines += '[' + srtLineO.startTime + '\t' + srtLineO.endTime + '\t' + srtLineO.speaker + ']' + '\n';
        lines += srtLineO.text + '\n\n';

      }

      if (cb) {
        cb(lines)
      } else {
        return head + '\n\n' + lines
      };
    }

    loopThroughStuff(attr.text, function(res) {
      result = createPlainTextTimecoded(res)
    })


    return result;

  },


  returnEDLSrtJson: function(text) {

    return createSrtContent(text);

  }

});
