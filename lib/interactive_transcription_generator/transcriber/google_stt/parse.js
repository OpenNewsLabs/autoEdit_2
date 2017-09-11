//Not needed for google as no transcriptions in the API?
// or add 

/**
* @module parse
* @description adds time offest onto each word IBM Watson STT Service json.
* @author Pietro Passarelli 
* @description this is so that each chunk of audio that has been transcribed separately can be joined back togethere.
* @tutorial IBM_watson_stt_specs
*/


/**
* @function parse
* @description Takes IBM Watson STT Service json and adds time offest onto each word.
* this is so that each chunk of audio that has been transcribed separately can be joined back togethere.
* @param {Object[]} data - array list of transcription json with IBM specs 
* @param {number} offset - number offset of the chunked clip relative to original source audio
* @returns {Object} - same json IBM STT transcription specs(but with offset).
*/

"use strict";

function parse(data, offset) {
  console.log("prase", offset, data);
  console.log("INSIDE PARSE.js: ",JSON.stringify(data, null, 2));
   // if(data != null){
    //sentences output 
    var out = {
      sentences: []
    };

    //TODO: not sure if this is necessary. eg when is the case in which offset would be undefined.
    // if (typeof offset === 'undefined') {
    //   offset = 0;
    // }

  // modifying sentences results 
  out.sentences = data.results.map(function(r) {
    // new item object 
    var item = {};
    // set item to IBM Json transcription one
    var _item = r.alternatives[0];
    item.transcript = _item.transcript;
    item.confidence = _item.confidence;
    // modify item IBM Json transcription to add time offset
    item.words = _item.words.map(function(t, index, array) {

      // var startTimeTmp = t.startTime.split("s")[0];
      // var endTimeTmp = t.endTime.split("s")[0];
      // add time offset for each word start and end time
      var endTime = t.endTime;
      //if the word element has start and end time that are equal, possibly a bug on google part, then making the end time equal to start of next word as temporary patch before raising the issue and waiting for it to be solved.
      // if((t.startTime == t.endTime) && (array[index+1]!= undefined) ){
      //   // console.log("::does it go here?::",t.startTime,t.endTime )
      //  console.log("-->does it go here?<---",t.startTime,t.endTime,"endTime",endTime , index, array);
      //   endTime = array[index+1].startTime;
      //   console.log("endTimeChanged", endTime)
        
      // }
      // if(t.startTime == t.endTime){
      //   endTime = parseFloat(t.endTime) +0.005;
      // } 
      
      var tmpWord = {
        word: t.word,
        //For some reason I don't understand google returns timecodes as `48.400s` with the s for second in the string,
        startTime: parseFloat(t.startTime)+ parseFloat(offset),
        endTime: parseFloat(endTime) + parseFloat(offset) 
      };

      return tmpWord;
    });
    // add item back to the list of results
    return item;
  });

  console.log("INSIDE PARSE.js after parsing: ",JSON.stringify(out, null, 2));
  //returning results 
  return out;

}


module.exports = parse;
