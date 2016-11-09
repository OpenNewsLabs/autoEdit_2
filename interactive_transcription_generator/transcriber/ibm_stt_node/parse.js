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

// "use strict";

function parse(data, offset) {
  
  //sentences output 
  var out = {
    sentences: []
  };

  //TODO: not sure if this is necessary. eg when is the case in which offset would be undefined.
  if (typeof offset === 'undefined') {
    offset = 0;
  }

  // modifying sentences results 
  out.sentences = data.results.map(function(r) {
    // new item object 
    var item = {};
    // set item to IBM Json transcription one
    var _item = r.alternatives[0];
    item.transcript = _item.transcript;
    item.confidence = _item.confidence;
    // modify item IBM Json transcription to add time offset
    item.words = _item.timestamps.map(function(t) {
      // add time offset for each word start and end time
      return {
        word: t[0],
        start: t[1] + offset,
        end: t[2] + offset
      };
    });
    // add item back to the list of results
    return item;
  });

  //returning results 
  return out;
}


module.exports = parse;
