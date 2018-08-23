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

  // iterate over words. when find punctuation `.` create a new line and add to paragraph
  line.id = 0;

  words.forEach((w)=>{
    words.push(w);

    // end of sentence
    if(w.text === '.'){
      // If it is a speechmatics "punctuation word", then don't add it to the line.
      // but add punctuation to last word. to keep consistency with other autoEdit transcripts
      line.line[ line.line.length-1].text +="."
      // line.line.push(w);
      // set end and start time code in lines.
      line.startTime = line.line[0].startTime;
      line.endTime =  line.line[ line.line.length-1].endTime;
      // add line to lines in paragraph 
      lines.push(line);
      // keep track of counter for line before resetting
      var tmpCounter = line.id;
      // reset line object
      line = {"line":[]};
      // icrement id
      line.id =1+tmpCounter;
    }
    else{
      // if it is not end of line/sentence add word to line
      line.line.push(w);
    }
  })
 
 // add line sot paragraph 
 // TODO: this is where to do interpolation with speaker diarization 
  paragraphs[0].paragraph  = lines;
   //return results
  return paragraphs;
}


module.exports = convertSpeechmaticsJsonToTranscripJson;

