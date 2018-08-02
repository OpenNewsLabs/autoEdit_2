"use strict";

function convertBBCJsonToTranscripJson(transcriptionJson){
  var wordCounter = 0;
  var lines = [];
  var line ={"line":[]};
  //for now IBM does not do speaker diarization so adding everything into one paragraph for now. But modeled transcription with paragraph containing lines with speaker associated to it. 
  var paragraphs = [{"id":0,  "speaker": "Unnamed Speaker","paragraph":{}}];
  //iterating over the IBM STT json lines 
 
  var BBCWords = transcriptionJson.retval.words;

  var words = BBCWords.map((word, index)=>{
  	return {
  		id: index,
  		text: word.punct,
        startTime: parseFloat(word.start),
        endTime: parseFloat(word.end)  
  	}
  })

  line.id = 0;
  line.line = words;
  line.startTime = words[0].startTime;
  line.endTime = words[words.length-1].endTime;
  lines.push(line);
  //return results
  paragraphs[0].paragraph  = lines;
  // console.log(JSON.stringify(paragraphs,null,2);
  return paragraphs;
}

module.exports = convertBBCJsonToTranscripJson;

// exampel usage
// const exampleJsonTranscriptionBBC = require('./newslabs-kaldi-sdk/example/octo-kaldi.json')
// const transcriptionJSON = convertBBCJsonToTranscripJson(exampleJsonTranscriptionBBC);
// console.log(JSON.stringify(transcriptionJSON[0],null,2));