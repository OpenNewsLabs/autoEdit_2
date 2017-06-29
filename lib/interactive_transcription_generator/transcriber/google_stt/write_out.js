/**
 * @module writeOut
 * @description reorganise IBM Watson STT Json in the right timecode order
 * @author Pietro Passarelli
 * @description sorting concat json, deleting tmp audio files, and returning
 * takes in data array of ibm watson json stt, callback for final json to output
 * @requires fs
 * @tutorial IBM_watson_stt_specs
 */

"use strict";

var fs = require('fs');


/** 
* @function writeOut
* @description reorganise IBM Watson STT Json in the right timecode order
* @param {object} data - IBM STT transcription Json specs 
*/
function writeOut(data) {
  //data[0].data.words
  //data[0].f
  //data[0].f.name
  //data[0].f.offset
  // console.log(JSON.stringify(data[0], null,2));
  //results list 
  var out = [];
 

  //order by timecode number in seconds 
  data = data.sort(function(a, b) {
    // console.log("||||--------");
    // console.log("a in writeOut: ",JSON.stringify(a, null,2));
    return a.f.offset - b.f.offset;
  });
  // console.log(JSON.stringify(data, null,2));

  //concat json transcription for individual audio clips into one json
  data.forEach(function(d, index) {
     var line = {};
    // console.log(JSON.stringify(d, null,2));
    // console.log("----");
      // console.log("--------//////");
      // console.log("d.data.wordsin writeOut: ",JSON.stringify(d.data.words, null,2));
      // var tmpLines =[];
      // tmpLines.concat(d.data.words);
      line.id = index;
      //TODO: need to add start and end time for lines
      line.words =[];
      line.words = d.data.words;
      // console.log(JSON.stringify(line, null,2));
      // console.log("----");
      out.push(line);
  });

  //TODO: remove tmp files,this raises error is it coz needs "./" ad beginning of tmp folder path?
    //removing temp audio files
    // if (data.length > 1) {
    //   data.forEach(function(d) {
    //     try {
    //       fs.unlink(d.f.name);
    //     }//try
    //       catch(err) {
    //       console.error("ERROR: wasn't able to delete temporary transcription files ", err);
    //     }
    //   });
    // }
  
  //return resuls list, output json of transcription IBM Specs
  // fs.writeFileSync("./out3.json", JSON.stringify(out, null,2));
  // console.log("----");
  // console.log(JSON.stringify(out, null,2));
  return out;
}


// writeOut(exampleOut);

module.exports = writeOut;
