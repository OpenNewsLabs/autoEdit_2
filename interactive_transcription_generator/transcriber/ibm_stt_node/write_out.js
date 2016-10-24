/**
 * @module writeOut
 * @description reorganise IBM Watson STT Json in the right timecode order
 * @author Pietro Passarelli
 * @description sorting concat json, deleting tmp audio files, and returning
 * takes in data array of ibm watson json stt, callback for final json to output
 * @requires fs
 * @tutorial IBM_watson_stt_specs
 */

// "use strict";

var fs = require('fs');

/** 
* @function writeOut
* @description reorganise IBM Watson STT Json in the right timecode order
* @param {object} data - IBM STT transcription Json specs 
*/
function writeOut(data) {
  //results list 
  var out = [];
  //order by timecode number in seconds 
  data = data.sort(function(a, b) {
    return a.f.offset - b.f.offset;
  });
  //concat json transcription for individual audio clips into one json
  data.forEach(function(d) {
    out = out.concat(d.data.sentences);
  });

  //removing temp audio files
  if (data.length > 1) {
    data.forEach(function(d) {
      fs.unlink(d.f.name);
    });
  }
  //return resuls list, output json of transcription IBM Specs
  return out;
}

module.exports = writeOut;
