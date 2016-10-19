/**
 * @module parseSamJsonToTranscripJson
 * @description Converts a transcription of json witb IBM STT API specs to a transcription json that meets autoEdit2 specs 
 * @author Pietro Passarelli 
 * @example <caption>Example usage parsing IBM STT transcription Json specs</caption>
  var fs = require("fs")
  var demo= "tramscription.json"
  var demoContent = JSON.parse(fs.readFileSync(demo).toString());

  parseSamJsonToTranscripJson(demoContent, function(res){
    console.log(JSON.stringify(res, nul, 4))
    fs.writeFileSync("./transcription.json",JSON.stringify(res, nul, 4) )
  })
 * @require fs 
 * @tutorial IBM_watson_stt_specs
 * @tutorial autoEdit2_transcrition_json_spec
 */
var fs = require("fs");

/**
* @function parseSamJsonToTranscripJson
* @description Converts a transcription of json witb IBM STT API specs to a transcription json that meets autoEdit2 specs 
* @param  {object} - IBM STT transcription json spec
*/
function parseSamJsonToTranscripJson(transcriptionJson){
  var wordCounter = 0;
  var result = [];
  var line ={"line":[]};
  //iterating over the IBM STT json lines 
  for(var i =0; i< transcriptionJson.length; i++){
    var oldLine = transcriptionJson[i];
    //iteratign over words 
    for(var k =0; k< oldLine.words.length; k++){
      var oldWord = oldLine.words[k];
      //creates a word object 
      var newWord = {
        id: wordCounter,
        text: oldWord.word,
        startTime: oldWord.start,
        endTime: oldWord.end
      };
      //ad counter id to line object 
      line.id =i;

      //line start and end time, same as first and last word object times
      line.starTime = oldLine.words[0].start;
      line.endTime =  oldLine.words[oldLine.words.length-1].end;
      //adding words to line
      line.line.push(newWord);

      wordCounter+=1;//
    }
    //add to results 
    result.push(line);
    //reset words in line for next iteration 
    line ={"line":[]};
  }
  //return results
  return result;
}


module.exports = parseSamJsonToTranscripJson;
