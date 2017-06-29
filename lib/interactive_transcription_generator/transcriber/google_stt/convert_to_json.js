//a module to convert google results into autoEdit JSON.

function convertToJson(transcriptionJson){
  var wordCounter = 0;
  var lines = [];
  var line ={"line":[]};
  //for now IBM does not do speaker diarization so adding everything into one paragraph for now. But modeled transcription with paragraph containing lines with speaker associated to it. 
  var paragraphs = [{"id":0,  "speaker": "Unnamed Speaker","paragraph":{}}];
  //iterating over the IBM STT json lines 
  for(var i =0; i< transcriptionJson.length; i++){
    var oldLine = transcriptionJson[i];
    //iteratign over words 
    for(var k =0; k< oldLine.words.length; k++){
    	
      var oldWord = oldLine.words[k];
      // console.log("oldWord:", JSON.stringify(oldWord,null,2));
      //creates a word object 
      var newWord = {
        id: wordCounter,
        text: oldWord.word,
        startTime: oldWord.startTime,
        endTime: oldWord.endTime
      };
      //ad counter id to line object 
      line.id =i;
      //TODO: need to add start and end time for lines
      //line start and end time, same as first and last word object times
      line.startTime = oldLine.words[0].startTime;
      // console.log("line.startTime", line.startTime);
      line.endTime =  oldLine.words[oldLine.words.length-1].endTime;
        // console.log("line.endTime", line.endTime);
      //adding words to line
      line.line.push(newWord);
      // console.log("---line", JSON.stringify(line,null,2));
      wordCounter+=1;//
    }
    //add to lines 
    lines.push(line);
    //reset words in line for next iteration 
    line ={"line":[]};
  }
  //return results
  paragraphs[0].paragraph  = lines;;
  console.log("-----paragraphs------")
  console.log(JSON.stringify(paragraphs,null,2));

  return paragraphs;


}


module.exports = convertToJson;