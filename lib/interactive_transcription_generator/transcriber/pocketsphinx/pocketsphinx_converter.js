/**
* Function to converts pocketSphinx transcription into hypertranscript json
From this

how do you destroy i said i needed
<s> 0.160 0.180 0.998501
how 0.190 0.340 0.070404
do 0.350 0.510 0.740274
you 0.520 0.890 0.979021
destroy 0.900 1.260 0.768872
i 1.270 1.490 0.201456
said 1.500 1.700 0.611245
<sil> 1.710 2.050 0.992924
i 2.060 2.240 0.329978
needed(2) 2.250 2.640 0.435223
</s> 2.650 3.040 1.000000

to autoEdit json 

*/


'use strict';
var fs = require("fs");


function convert_transcription(data, cb) {
  // fs.writeFileSync('./1testAutoEditPocketsphinx.txt', data);
  console.log("//////////START-DATA///////////////");
  console.log(data);
  console.log("//////////END-DATA///////////////");

  var pocketsphinxTimecodedLine =  /<s>|<\/s>/g;
  var pocketSphinxResultArray = data.split(pocketsphinxTimecodedLine);

  var paragraphs = [];

  var paragraph = {};
      paragraph.id = 0; 
      paragraph.speaker = "Some Speaker";
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
                word.startTime  = wordAr[1];
                word.endTime    = wordAr[2];
                word.accuracy   = wordAr[3];
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

  console.log("//////////START-paragraphs///////////////");
  console.log(JSON.stringify(paragraphs,null,2));
  console.log("//////////END-paragraphs///////////////");
  
  //TODO: need to add error handling 
  if(cb){
    cb(null, paragraphs);
  }else{ 
    return paragraphs;
  }
  
}

module.exports.convert = convert_transcription;