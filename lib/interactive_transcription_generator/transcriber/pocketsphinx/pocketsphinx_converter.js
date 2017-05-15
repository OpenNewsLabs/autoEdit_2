/**
* @module pocketsphinx_converter 
* @description Function to converts pocketSphinx transcription into autoEdit transcription json
*  it has not dependencies as it is only parsing the text.
* @author Pietro Passarelli 
* 
* @example <caption>Example Pocketsphinx output </caption>

and then may dispose of this that you could this victim in chest when you read back when the government accountability project
<s> 0.070 0.090 0.996306
and 0.100 0.230 0.850170
then 0.240 0.530 0.927457
<sil> 0.540 0.940 0.996306
may 0.950 1.250 0.063430
dispose 1.260 1.750 0.045837
of 1.760 2.010 0.093905
this 2.020 2.290 0.128293
that(2) 2.300 2.480 0.291638
you 2.490 2.610 0.338197
could 2.620 2.830 0.151054
<sil> 2.840 2.960 0.837093
this 2.970 3.340 0.669820
<sil> 3.350 3.380 0.565092
victim 3.390 3.860 0.109049
in 3.870 4.300 0.197427

...

* to autoEdit json 
* @example <caption>Example usage </caption>
  "text": [
    {
      "id": 0,
      "speaker": "Unnamed Speaker",
      "paragraph": [
        {
          "line": [
            {
              "id": 0,
              "text": "and",
              "startTime": 12.09,
              "endTime": 12.36
            },
            {
              "id": 1,
              "text": "like",
              "startTime": 12.36,
              "endTime": 12.53
            },

            ...
*/

'use strict';

/**
* @function convert_transcription
* @description converts pocketSphinx transcription into autoEdit transcription json
* @param {string} data - string, pocketsphinx speech to text recognition, see example above.
* @returns {callback}  - reutns an autoEdit json transcription, see example. Callback optional if synchronous. 
*/
function convert_transcription(data, cb) {
  console.info("pocketsphinx finished transcribing, and converting into autoEdit JSON");
  var pocketsphinxTimecodedLine =  /<s>|<\/s>/g;
  var pocketSphinxResultArray = data.split(pocketsphinxTimecodedLine);

  var paragraphs = [];

  var paragraph = {};
      paragraph.id = 0; 
      paragraph.speaker = "Unnamed Speaker";
      paragraph.paragraph = [];

  var lineIdCounter = 0; 
  var wordIdCOunter =0; 


  pocketSphinxResultArray.forEach(function (line) {

    var outputLine = {};
        outputLine.line = [];  
        outputLine.id = lineIdCounter; 

    lineIdCounter+=1;

    //excluding pocketsphinx sentences
    if(line.split("\n").length > 3 ){

      var lineAr = line.split("\n");
      //iterating over words  
      lineAr.forEach(function(pocketSphinxWordString){ 
        if(pocketSphinxWordString !== ""){
          var wordAr = pocketSphinxWordString.split(" ");
          var text = wordAr[0];
          //a confition if word is not a empty string. and other pocketsphinx symbols 
          if(text !== "" && text !== "<sil>"  && text !== "[SPEECH]"){
            var word = {};
                //removing (2) (3) accourances, which are pocketsphinx notice of use of alternate word in dictionary / model.
                word.text       = text.replace(/\([0-9]+\)/g, "");
                word.startTime  = parseFloat(wordAr[1]);
                word.endTime    = parseFloat(wordAr[2]);
                word.accuracy   = parseFloat(wordAr[3]);
                word.id         = wordIdCOunter;

            wordIdCOunter+=1;
            //adding word to line
            outputLine.line.push(word);
         }
       }
     });
    }

    if(outputLine.line.length !== 0){
      //add start and end timecodes to line, following autoEdit json specs. 
      outputLine.startTime =  outputLine.line[0].startTime;
      outputLine.endTime = outputLine.line[outputLine.line.length-1].endTime;
      // adding line to paragraph. 
      paragraph.paragraph.push(outputLine); 
    }

  });

  //there is only one paragraph because of no speaker diarization. 
  paragraphs.push(paragraph); 
  
  //TODO: need to add error handling 
  if(cb){
    cb(null, paragraphs);
  }else{ 
    return paragraphs;
  }
  
}

module.exports.convert = convert_transcription;