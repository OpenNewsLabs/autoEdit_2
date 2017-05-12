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
  var pocketSphinxResultArray = data.split("<s>");
  var pocketsphinxTimecodedLine =  /<\/s>/g;
  var paragraphs = [];
  var paragraph = {};
      paragraph.id = 0; 
      paragraph.speaker = "Some Speaker";
      paragraph.paragraph = [];

  var lineIdCounter = 0; 
  var wordIdCOunter =0; 
  // fs.writeFileSync("./2testAutoEditPocketsphinx.json",JSON.stringify(pocketSphinxResultArray,null,2));

   console.log("//////////START-pocketSphinxResultArray///////////////");
  console.log(JSON.stringify(pocketSphinxResultArray,null,2));
  console.log("//////////END-pocketSphinxResultArray///////////////");

  pocketSphinxResultArray.forEach(function (line) {

    // if(pocketsphinxTimecodedLine.test(line)){
      var lineArray = line.split("\n");
      console.log("lineArray: ",lineArray);

      // if (lineArray.length > 3){
        var outputLine = {};
        outputLine.line = [];  
        outputLine.id = lineIdCounter; 

        lineIdCounter+=1;

        lineArray.forEach(function (word) {
          var wordArray = word.split(" ");
          console.log("wordArray",wordArray);
          if(wordArray.length === 4){
              var text = wordArray[0];
              var startTime = wordArray[1];
              var endTime = wordArray[2];
            // var accuracy = wordArray[3];
            // [SPEECH] seem to refer to "uhm"
            if(text !== "</s>" && text !== "<sil>" && text !== "[SPEECH]"  && text !== "" ){
              var newWord = {
                id: wordIdCOunter,
                startTime: startTime,
                //(n) is the alternative pronunciations for certain words in pocketsphinx.
                text: text.replace("(2)", "").replace("(3)", "").replace("(4)", ""),
                endTime: endTime
              };
              wordIdCOunter+=1;
              //add word to line 
              outputLine.line.push(newWord);
            }
          }
        });
        //adding start and end time to line object 
        outputLine.startTime =  outputLine.line[0].startTime;
        outputLine.endTime = outputLine.line[outputLine.line.length-1].endTime;
        //adding line to paragraph. 
        paragraph.paragraph.push(outputLine);
      // } 
    // }
  });

  paragraphs.push(paragraph);
  // fs.writeFileSync('./3testAutoEditPocketsphinxConverted.json', JSON.stringify(paragraph, null, 2));
  
  console.log("//////////START-paragraph///////////////");
  console.log(JSON.stringify(paragraph,null,2));
  console.log("//////////END-paragraph///////////////");
  
  if(cb){
    cb(paragraphs);
  }else{
    return paragraphs;
  }
  
}

module.exports.convert = convert_transcription;