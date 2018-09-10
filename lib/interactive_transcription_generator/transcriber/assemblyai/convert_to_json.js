/**
 * Converting AssemblyAI transcription json to autoEdit one
 * Docs for assemblyAI spec 
 */
"use strict";

function convertAssemblyaiJsonToTranscripJson(transcriptionJson){
  var lines = [];
  var line ={"line":[]};
  //for now IBM does not do speaker diarization so adding everything into one paragraph for now. But modeled transcription with paragraph containing lines with speaker associated to it. 
  var paragraphs = [{"id":0,  "speaker": "Unnamed Speaker","paragraph":{}}];
  //iterating over the IBM STT json lines 
 
  var assemblyaiWords = transcriptionJson.words;

  var words = assemblyaiWords.map((sw, index)=>{
  	return {
  		id: index,
  		text: sw.text,
        startTime: parseFloat(convertMillisecondToSecond(sw.start)),
        endTime: parseFloat(convertMillisecondToSecond(sw.end)) 
  	}
  })

//   console.log(words)
  // iterate over words. when find punctuation `.` create a new line and add to paragraph
  line.id = 0;
  line.line = words;
  lines.push(line);
 
 // add line sot paragraph 
 // TODO: this is where to do interpolation with speaker diarization 
  paragraphs[0].paragraph  = lines;
   //return results
  return paragraphs;
}

function convertMillisecondToSecond(millisecond){
   var second =  millisecond / 1000;
   return second;
}

module.exports = convertAssemblyaiJsonToTranscripJson;


// exmaple usage
// const sampleJson = require('./sample-assemblyai.json')
// var result = convertAssemblyaiJsonToTranscripJson(sampleJson);
// console.log(JSON.stringify(result, null,2));