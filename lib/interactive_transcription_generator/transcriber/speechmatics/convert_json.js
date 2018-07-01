"use strict";

function convertSpeechmaticsJsonToTranscripJson(transcriptionJson){
  var wordCounter = 0;
  var lines = [];
  var line ={"line":[]};
  //for now IBM does not do speaker diarization so adding everything into one paragraph for now. But modeled transcription with paragraph containing lines with speaker associated to it. 
  var paragraphs = [{"id":0,  "speaker": "Unnamed Speaker","paragraph":{}}];
  //iterating over the IBM STT json lines 
 
  var speechmanticsWords = transcriptionJson.words;

  var words = speechmanticsWords.map((sw, index)=>{
  	return {
  		id: index,
  		text: sw.name,
        startTime: parseFloat(sw.time),
        endTime: parseFloat(sw.time) + parseFloat(sw.duration) 
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


module.exports = convertSpeechmaticsJsonToTranscripJson;

