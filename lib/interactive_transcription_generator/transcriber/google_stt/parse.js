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
   // if(data != null){
    //sentences output 
    var out = {
      sentences: []
    };

    //TODO: not sure if this is necessary. eg when is the case in which offset would be undefined.
    if (typeof offset === 'undefined') {
      offset = 0;
    }

    var paragraphs = [{"id":0,  "speaker": "Unknown Speaker","paragraph":{}}];

    var lines = [ { line: [] } ];

    // modifying sentences results 
    // out.sentences = data.results.map(function(r) {
      // new item object 
      var item = {};
          item.words = [];
      //TODO: modify for google.
      // set item to IBM Json transcription one
      var text = data[0];
      
      var textAr = text.split(" ");
      // console.log(text,data, textAr);
      //TODO: here it could calculate word time by using popcornjs SRT parser code 
      //https://github.com/pietrop/quickQuoteNode/blob/master/lib/interactive_video_components/processing/srt_to_hypertranscript.js
      
      // https://github.com/pietrop/quickQuoteNode/blob/master/lib/interactive_video_components/processing/srt_to_hypertranscript.js#L97
      //TODO: change to cammel case
      var word_counter =0;
      var interval = 50; //seconds 
      var words_in_a_line = textAr;
      var number_of_words_in_line = words_in_a_line.length;
      var line_duration =  (offset+interval) - offset;//line duration = interval?!
      var average_word_duration  = line_duration / number_of_words_in_line;
      var number_of_letters_in_a_sentence = 0;

      textAr.forEach(function(word, index){
        number_of_letters_in_a_sentence += word.length;
      });
      
      textAr.forEach(function(w, index){
        var word = {};
        word.word = w;
        word.id = index;
        word.startTime = offset;
        word.endTime = offset+interval;
        item.words.push(word);
        item.offset = offset;
      });
      // item.transcript = _item.transcript;
      // item.confidence = _item.confidence;
      // modify item IBM Json transcription to add time offset
      // item.words = _item.timestamps.map(function(t) {
      //   // add time offset for each word start and end time
      //   return {
      //     word: t[0],
      //     start: t[1] + offset,
      //     end: t[2] + offset
      //   };
      // });
      // add item back to the list of results
      return item;
    // });

    // //returning results 
    // return out;
  // }//if != null
}


module.exports = parse;
